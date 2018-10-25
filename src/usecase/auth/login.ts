import * as Joi from 'joi';
import Validate from '../../helpers/validate';
import { UserModelInterface } from '../../models/user';
import { sha1 } from '../../helpers/index';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment-timezone';
import * as models from '../../models';
import { redis } from '../../cache';
import { randomString } from '../../helpers';
import { JWT_SECRET } from '../../configs';

interface RequestInterface {
    phone_number: { type: String, index: true },
    password: String,
    device_id: { type: String, index: true },
    device_name: String,
    device_token: { type: String, index: true },
    user: UserModelInterface
}

export default function (request: RequestInterface) {

    return new Promise((async (resolve, reject) => {
        try {

            request = new Validate(request)
                .joi({
                    phone_number: Joi.string().required(),
                    password: Joi.string().required(),
                    device_id: Joi.string().required(),
                    device_name: Joi.string().optional(),
                    device_token: Joi.string().required()
                }).validate();

            let user_data = await models.user.findOne({ phone_number: request.phone_number });

            let password = sha1(request.password + user_data.salt);

            if (user_data.password !== password) {
                throw new Error('Wrong password');
            }
            user_data.last_active = new Date();
            await user_data.save();

            let device_data = await models.device.findOne({
                device_id: request.device_id, user_id: user_data._id
            });

            if (!device_data) {
                let device: any     = new models.device();
                device.device_id    = request.device_id;
                device.user_id      = user_data._id;
                device.device_name  = request.device_name;
                device.device_token = request.device_token;
                device.last_active  = new Date();

                await device.save();

                let refresh_token :any          = new models.refresh_token();
                refresh_token.user_id       = user_data._id;
                refresh_token.device_id   = request.device_id;
                refresh_token.refresh_token = sha1(user_data.phone_number + request.device_id + randomString(10));
                await refresh_token.save();
            }
            let user = await  redis.get('user_' + user_data._id);

            if (!user) {
                await redis.setex('user_' + user_data._id, 180, JSON.stringify(user_data.toJSON()));
            }

            let token              = jwt.sign({ user_id: user_data._id }, JWT_SECRET, { expiresIn: '1h' });
            let refresh_token: any = await models.refresh_token.findOne({ user_id: user_data._id, device_id: request.device_id });
            console.log('refresh_token', refresh_token);
            return resolve({
                err: 0,
                msg: 'Login successful',
                data: {
                    access_token: token,
                    token_type: 'Bearer',
                    id: user_data._id,
                    expired_in: moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
                    refresh_token: refresh_token.refresh_token
                }
            });

        } catch (err) {

            return reject(err);
        }
    }));

}