import * as Joi from 'joi';
import Validate from '../../helpers/validate';
import { UserModelInterface } from '../../models/user';
import * as models from '../../models';
import { redis } from '../../cache';
import moment = require('moment-timezone');

interface RequestInterface {
    payee_id: any
    amount: number
    device_id: string
    message: string
    user: UserModelInterface
}

export default function (request: RequestInterface): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            request       = new Validate(request)
                .joi({
                    payee_id: Joi.any().required(),
                    amount: Joi.number().required(),
                    message: Joi.string().required(),
                }).validate();
            let user_data = request.user;
            let payye = await models.user.findOne({_id: request.payee_id});
            if (request.payee_id === user_data._id || !payye) {
                throw new Error('Payee is invalid');
            }
            ;
            let transaction            = new models.transaction();
            transaction.payer_id       = user_data._id;
            transaction.amount         = request.amount;
            transaction.type           = 'TRANSFER';
            transaction.device_id      = request.device_id;
            transaction.payee_id       = request.payee_id;
            transaction.balance_before = user_data.balance;
            transaction.balance_after  = user_data.balance - request.amount;
            if (transaction.balance_after < 50000) {
                throw  new Error('Invalid amount entered');
            }
            transaction.message = request.message;
            await  transaction.save();

            let user: any = await models.user.findOne({ _id: user_data._id });

            user.balance = transaction.balance_after;

            await  user.save();
            await redis.setex('user_' + user._id, 180, JSON.stringify(user.toJSON()));
            let payee_data = await  models.user.findOne({ _id: request.payee_id });
            payee_data.balance += request.amount;
            await  payee_data.save();

            return resolve({
                err: 0,
                msg: 'Successful Transfer',
                data: {
                    id: transaction._id,
                    type: transaction.type,
                    amount: transaction.amount,
                    device_id: transaction.device_id,
                    message: transaction.message,
                    payee_id: transaction.payee_id,
                    payee_name: payee_data.name,
                    payer_id: user_data._id,
                    payer_name: user_data.name,
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