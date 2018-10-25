import { NextFunction, Request, Response } from 'express';
import * as usecase from '../usecase';

class AuthController {
    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let body     = req.body;
            let response = await usecase.Auth.register({
                phone_number: body.phone_number,
                email: body.email,
                name: body.name,
                address: body.address,
                device_id: body.device_id,
                device_name: body.device_id,
                device_token: body.device_token,
                password: body.password,

            });
            res.json(response);
        } catch (err) {
            return next(err);
        }
    };
    public login    = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let body     = req.body;
            let response = await usecase.Auth.login({
                phone_number: body.phone_number,
                password: body.password,
                device_id: body.device_id,
                device_name: body.device_name,
                device_token: body.device_token,
                user: res.locals.user
            });
            res.json(response);
        } catch (err) {
            return next(err);
        }
    };
    public refreshToken = async (req: Request, res: Response, next: NextFunction)=>{
        try{
            let body = req.body;
            let response = await usecase.Auth.refreshToken({
                refresh_token:  body.refresh_token,
                device_id: body.device_id
            })
            res.json(response)
        }catch (e) {
            return next(e)
        }
    }
}

export default new AuthController();