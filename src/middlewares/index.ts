import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { TokenExpiredError } from 'jsonwebtoken';
import { sha1, sortAnObjectByKey } from '../helpers/index';
import { redis } from '../cache/index';
import * as models from '../models'
import Exception from '../exeptions/Exeption';
import ExceptionCode from '../exeptions/ExeptionCode';
import ExeptionCode from '../exeptions/ExeptionCode';
import { JWT_SECRET } from '../configs';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {

        console.log(req.headers)

        let body;

        if(req.method === 'GET') {
            body = req.query;
        } else if(req.method === 'POST') {
            body = req.body;
        } else if (req.method ==='DELETE'){
            body = req.params;
        }

        let access_token: any = req.headers.access_token;

        console.log(body);

        if (!access_token) {
            throw new Exception('Missing access_token!', ExceptionCode.ERROR_MISSING_TOKEN);
        }

        let device_id = body.device_id;
        if (!device_id)
        {
            throw new Error('Missing device_id!');

        }

        let decode: any = jwt.verify(access_token, JWT_SECRET);
        let user_id     = decode.user_id;

        let device = await  models.device.findOne({device_id: device_id, user_id: user_id});
        
        if (!device)
        {
            throw new Error('Session Expired');
        }

        let user:any = await  redis.get('user_' + user_id);
        if (!user) {
           user = await models.user.findOne({
                _id: user_id
            });
            if (!user)
            {
                throw new Error('Wrong username!')
            }

            user = JSON.stringify(user.toJSON());
            await redis.setex('user_' + user_id, 180, user);
            console.log("USER:", user);

        }
        res.locals.user= JSON.parse(user);
        next();


    } catch (err) {

        if (err instanceof TokenExpiredError) {
            next(new Exception('Token is expried', ExeptionCode.ERROR_TOKEN_EXPIRED));
        }

        return next(err);
    }
};

export const sig = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let body = req.body;

        if (!body.sig || !body.ts) {
            throw new Error('missing require hash');
        }

        let sig_body = body.sig;

        delete body.sig;

        let data     = await sortAnObjectByKey(body);
        let sig_data = [];

        Object.keys(data).map(key => {
            sig_data.push(key + '=' + data[key]);
        });

        let sig = sha1(sig_data.join(''));
        console.log('sig', sig);

        // if (sig !== sig_body) {
        //     throw new Error('Sig is invalid!');
        // }

        next();
    } catch (err) {
        return next(err);
    }
};
