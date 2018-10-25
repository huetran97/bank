import * as Joi from 'joi';
import Validate from '../../helpers/validate'
import {UserModelInterface} from '../../models/user';

interface RequestInterface {
    user : UserModelInterface
    device_id: string
}

export default function (request : RequestInterface) : Promise < any > {
    return new Promise((resolve, reject) => {
        try {
            let user = request.user;

            return resolve({
                err: 0,
                msg: "Get balance successful",
                data: {
                    balance: user.balance
                }
            })
        } catch (e) {
            return reject(e);
        }
    });
}