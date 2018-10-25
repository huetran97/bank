import { NextFunction, Request, Response } from 'express';
import * as Usecase from '../usecase';

class Device {
    public getListDevice = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let body= req.body;
            let response = await Usecase.Device.listDevices({
                user: res.locals.user,
                device_id: body.device_id
            });
            res.json(response);
        } catch (e) {
            return next(e);
        }
    };

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let param    = req.params;
            let response = await  Usecase.Device.removeDevices({
                device_id: param.device_id,
                user: res.locals.user
            });
            res.json(response);
        } catch (e) {
            return next(e);
        }
    };
}

export default new Device();