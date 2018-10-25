import * as models from '../../models';
import { UserModelInterface } from '../../models/user';
import Validate from '../../helpers/validate';
import * as Joi from 'joi';
import moment = require('moment-timezone');

interface RequestInterface {
    device_id:string
    user: UserModelInterface
}

export default function (request: RequestInterface): Promise<any> {
    return new Promise(async (resolve, reject) => {

        try {
            let user         = request.user;

            let transactions = await models.transaction.find({
                $or: [
                    { payer_id: user._id },
                    { payee_id: user._id }
                ]
            }, {}, { sort: { 'created_at': -1 } });
            if (!transactions) {
                throw  new Error('No transactions yet');
            }

            return resolve({
                err: 0,
                msg: 'Get list transaction successful',
                data: transactions.map(transaction => {

                    return {
                        id: transaction._id,
                        type: transaction.type,
                        amount: transaction.amount,
                        device_id: transaction.device_id,
                        message: transaction.message,
                        created_at: moment(transaction.created_at).unix(),
                        updated_at: moment(transaction.updated_at).unix()
                    };
                })
            });

        } catch (e) {
            return reject(e);
        }
    });
}