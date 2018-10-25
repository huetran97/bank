import Validate from '../../helpers/validate';
import * as Joi from 'joi';
import { UserModelInterface } from '../../models/user';
import moment = require('moment-timezone');
import * as models from '../../models'

interface RequestInterface {
    name: string
    address: string
    avatar: string
    user: UserModelInterface
    device_id: string
}

export default function (request: RequestInterface) {
    return new Promise(async (resolve, reject) => {
        try {

            request  = new Validate(request)
                .joi({
                    name: Joi.string().optional(),
                    address: Joi.string().optional(),
                    avatar: Joi.string().optional(),
                })
                // .xor(['name', 'address', 'avatar'])
                .validate();

            let user_data= request.user;
            let user = await models.user.findOne({_id:user_data._id});

            if (request.name) {
                user.name = request.name;
            }

            if (request.address) {
                user.address = request.address;
            }

            if (request.avatar) {
                user.avatar = request.avatar;
            }
            await user.save();

            return resolve({
                err: 0,
                msg: 'Update info successful',
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
        } catch (e) {

            return reject(e);

        }
    });
}