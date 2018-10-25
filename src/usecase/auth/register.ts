import Validate from '../../helpers/validate';
import * as Joi from 'joi';
import * as jwt from 'jsonwebtoken';
import * as models from '../../models';
import { randomString, sha1 } from '../../helpers/index';
import * as moment from 'moment-timezone';
import { redis } from '../../cache/index';
import { JWT_SECRET } from '../../configs';

interface RequestInterface {
    phone_number: string
    email: string
    name: string
    address: string
    device_id: string
    device_name: string
    device_token: string
    password: string
}

export default function (request: RequestInterface) {
    return new Promise(async (resolve, reject) => {
        try {
            request       = new Validate(request)
                .joi({
                    phone_number: Joi.string().required(),
                    email: Joi.string().required(),
                    name: Joi.string().required(),
                    address: Joi.string().required(),
                    device_id: Joi.string().required(),
                    device_name: Joi.string().required(),
                    device_token: Joi.string().required(),
                    password: Joi.string().required()
                }).validate();
            let user_data = await models.user.findOne({
                    $or: [
                        { phone_number: request.phone_number },
                        { email: request.email }
                    ]
                }
            );

            if (user_data) {
                throw new Error('Account is exist');
            }

            let user          = new models.user();
            user.phone_number = request.phone_number;
            user.email        = request.email;
            user.name         = request.name;
            user.address      = request.address;
            user.salt         = randomString(20);
            user.password     = sha1(request.password + user.salt);
            user.balance      =0;
            user.last_active = new Date();

            await user.save();

            let user_redis = redis.setex('user_' + user._id, 180,JSON.stringify(user.toJSON()) );

            let refresh_token           = new models.refresh_token();
            refresh_token.user_id       = user._id;
            refresh_token.device_id     = request.device_id;
            refresh_token.refresh_token = sha1(user.phone_number + request.device_id + randomString(10));
            await refresh_token.save();

            let device          = new models.device();
            device.device_id    = request.device_id;
            device.user_id      = user._id;
            device.device_name  = request.device_name;
            device.device_token = request.device_token;
            device.last_active  = new Date();
            await device.save();

            let token = jwt.sign({ user_id: user._id }, JWT_SECRET, { expiresIn: '1h' });

            return resolve({
                err: 0,
                msg: 'Register successful',
                data: {
                    access_token: token,
                    token_type: 'Bearer',
                    id: user._id,
                    expired_in: moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
                    refresh_token:  refresh_token.refresh_token
                }
            });
        } catch (err) {
            return reject(err);
        }
    });
}