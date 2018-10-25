import * as Usecase from '../usecase';
import { NextFunction, Request, Response } from 'express';

class Transaction {
    public deposit = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let body     = req.body;
            let response = await Usecase.Transactions.deposit({
                amount: body.amount,
                user: res.locals.user,
                device_id: body.device_id
            });
            res.json(response);
        } catch (e) {
            return next(e);
        }
    };

    public withDraw = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let body     = req.body;
            let response = await Usecase.Transactions.withDraw({
                amount: body.amount,
                user: res.locals.user,
                device_id: body.device_id
            });
            res.json(response);
        } catch (e) {
            return next(e);
        }
    };

    public getDetailTransaction = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let params   = req.params;
            let body = req.body
            let response = await Usecase.Transactions.getDetailTransaction({
                transaction_id: params.transaction_id,
                user: res.locals.user,
                device_id: body.device_id

            });
            res.json(response);
        } catch (e) {
            return next(e);
        }
    };

    public getListTransaction = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let body = req.body;
            let response = await  Usecase.Transactions.getListTransaction({
                user: res.locals.user,
                device_id: body.device_id
            });
            res.json(response);
        } catch (e) {
            return next(e);
        }
    };

    public transfer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let body     = req.body;
            let response = await  Usecase.Transactions.transfer({
                payee_id: body.payee_id,
                amount: body.amount,
                message: body.message,
                user: res.locals.user,
                device_id: body.device_id
            });
            res.json(response);
        } catch (e) {
            return next(e);
        }
    };
}

export default new Transaction();