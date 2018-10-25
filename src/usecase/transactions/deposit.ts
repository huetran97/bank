import * as Joi from 'joi';
import Validate from '../../helpers/validate';
import * as models from '../../models';
import { redis } from '../../cache';
import moment = require('moment-timezone');


interface RequestInterface {
    device_id: string
    amount: number
    user: any
}

export default function (request: RequestInterface): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            request = new Validate(request)
                .joi({
                    amount: Joi.number().required().min(0),
                }).validate();

            let user_data = request.user;
            let user: any = await models.user.findOne({ _id: user_data._id });
            if (!user) {
                throw  new Error('User are not exist');
            }

            let transaction = new models.transaction();

            transaction.payer_id       = user_data._id;
            transaction.amount         = request.amount;
            transaction.type           = 'DEPOSIT';
            transaction.device_id      = request.device_id;
            transaction.payee_id       = user_data._id;
            transaction.balance_before = user.balance;
            transaction.balance_after  = user.balance + request.amount;
            transaction.message        = 'DEPOSIT';

            await transaction.save();
            // user.balance = transaction.balance_after ;
            user.balance += request.amount;
            await  user.save();
            await redis.setex('user_' + user._id, 180, JSON.stringify(user.toJSON()));

            return resolve({
                err: 0,
                msg: 'Deposit Successful',
                data: {
                    id: transaction._id,
                    type: transaction.type,
                    amount: request.amount,
                    message: transaction.message,
                    device_id: transaction.device_id,
                    balance_before: transaction.balance_before,
                    balance_after: transaction.balance_after,
                    created_at: moment(transaction.created_at).unix(),
                    updated_at: moment(transaction.updated_at).unix()
                }
            });
        } catch (e) {
            return reject(e);
        }
    });
}