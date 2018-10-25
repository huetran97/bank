import { NextFunction, Request, Response } from 'express';
import * as Usecase from '../usecase';

class User {

    public getInfo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let body     = req.body;


            let response = await Usecase.User.getInfo({
                user: res.locals.user,
                device_id: body.device_id
            });
            res.json(response);
        } catch (e) {
            return next(e);
        }
    };

    public updateInfo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let body     = req.body;
            let response = await Usecase.User.updateInfo({
                name: body.name,
                address: body.address,
                avatar: body.avatar,
                user: res.locals.user,
                device_id: body.device_id

            });
            res.json(response);
        } catch (e) {
            return next(e);
        }
    };

    public getBalance = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let body     = req.body;
            let response = await  Usecase.User.getBalance({
                user: res.locals.user,
                device_id: body.device_id

            });
            res.json(response);
        } catch (e) {
            return next(e);
        }
    };

}

export default new User();