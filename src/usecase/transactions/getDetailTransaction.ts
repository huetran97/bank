import { UserModelInterface } from '../../models/user';
import * as models from '../../models';
import Validate from '../../helpers/validate';
import * as Joi from 'joi';
import { ObjectID } from 'bson';
import moment = require('moment-timezone');

interface RequestInterface {
    device_id:string
    transaction_id: string
    user: UserModelInterface
}

export default function (request: RequestInterface): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            request = new Validate(request)
                .joi({
                    transaction_id: Joi.string().required(),
                }).validate();

            let user = request.user;

            if (!ObjectID.isValid(request.transaction_id)) {
                throw new Error('Transaction is not exist');
            }

            let transaction = await  models.transaction
                .findOne({ _id: request.transaction_id })
                .populate('payer_id')
                .populate('payee_id');

            if (!transaction) {
                throw  new Error('Transaction is not exist');
            }

            return resolve({
                err: 0,
                msg: 'Get detail transaction successful',
                data: {
                    id: transaction._id,
                    type: transaction.type,
                    amount: transaction.amount,
                    message: transaction.message,
                    device_id: transaction.device_id,
                    payee_id: transaction.payee_id._id,
                    payee_name: transaction.payee_id.name,
                    payer_id: transaction.payer_id._id,
                    payer_name: transaction.payer_id.name,
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