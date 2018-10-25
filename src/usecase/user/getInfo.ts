import { UserModelInterface } from '../../models/user';
import Validate from '../../helpers/validate';
import * as Joi from 'joi';
import moment = require('moment-timezone');

interface RequestInterface {
    user: UserModelInterface
    device_id: string
}

export default function (request: RequestInterface) {
    return new Promise(((resolve, reject) => {
        try {
            let user = request.user;

            return resolve({
                err: 0,
                msg: 'Get info sucessfully',
                data: {
                    name: user.name,
                    phone_number: user.phone_number,
                    email: user.email,
                    avatar: user.avatar,
                    address: user.address,
                    balance: user.balance,
                    last_active: moment(user.last_active).unix(),
                    created_at: moment(user.created_at).unix(),
                    updated_at: moment(user.updated_at).unix()
                }

            });
        } catch (err) {
            return reject(err);

        }
    }));
}