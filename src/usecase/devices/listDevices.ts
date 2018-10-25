import * as Joi from 'joi';
import Validate from '../../helpers/validate';
import { UserModelInterface } from '../../models/user';
import * as models from '../../models'
import moment = require('moment-timezone');
interface RequestInterface {
    device_id: string
user: UserModelInterface
}

export default function (request: RequestInterface): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            let user = request.user;

                let devices = await  models.device.find({user_id: user._id});
                if (!devices)
                {
                    throw  new Error('Device is invalid');
                }
                console.log('devices', devices);
            return resolve({
                err:0,
                msg:"Get list deivce successful",
                data :devices.map(device =>{
                    return {
                        id: device._id,
                        device_name: device.device_name,
                        device_id: device.device_id,
                        last_active:moment(device.last_active).unix(),
                        created_at: moment(device.created_at).unix(),
                    }
                })

            })
        } catch (e) {
            return reject(e);
        }
    });
}