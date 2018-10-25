import * as Joi from 'joi';
import Validate from '../../helpers/validate';
import * as models from '../../models';
import { UserModelInterface } from '../../models/user';

interface RequestInterface {
    device_id: string
    user: UserModelInterface
}

export default function (request: RequestInterface): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            let user = request.user;

            let device = await models.device.findOne({
                user_id: user._id, device_id: request.device_id
            });

            if (!device) {
                throw  new Error('Device is invalid');
            }
            
            let id = device._id;

            await  device.remove();

            await models.refresh_token.remove({
                device_id: request.device_id,
                user_id: user._id
            });

            return resolve({
                err: 0,
                msg: 'Delete device successful',
                data: {
                    id: id
                }
            });
        } catch (e) {
            return reject(e);
        }
    });
}