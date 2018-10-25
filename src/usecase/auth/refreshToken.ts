import * as jwt from 'jsonwebtoken';
import * as Joi from 'joi';
import Validate from '../../helpers/validate';
import * as moment from 'moment-timezone';
import * as models from '../../models'
import { JWT_SECRET } from '../../configs';
interface RequestInterface {
    refresh_token: string
    device_id: string

}

export default function (request: RequestInterface): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            request         = new Validate(request)
                .joi({
                    refresh_token: Joi.string().required(),
                    device_id: Joi.string().required()
                }).validate();
            let user = await models.refresh_token.findOne({refresh_token : request.refresh_token, device_id: request.device_id });
            if (!user)
            {
                throw  new Error('Refresh token is invalid');
            }
            let user_id = user.user_id;
            let token       = jwt.sign({ user_id: user_id }, JWT_SECRET, { expiresIn: '1h' });

            return resolve({
                err: 0,
                msg: 'Refresh token successful',
                data: {
                    access_token: token,
                    token_type: 'Bearer',
                    expired_in: moment().add(1, 'hours').unix()
                }
            });
        } catch (e) {
            return reject(e);
        }
    });
}