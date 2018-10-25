import * as mongoose from 'mongoose';
import { UserModelInterface } from './user';

const Schema = new mongoose.Schema({
    payer_id: { type: String, index: true, ref: 'users' }, //user_id
    amount: Number,
    type: { type: String, index: true }, //TRANSFER`, `DEPOSIT`, `WITHDRAW`
    payee_id: { type: String, index: true, ref: 'users' },
    balance_before: Number,
    balance_after: Number,
    message: String,
    device_id: { type: String, index: true },

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

interface TransactionModelInterface extends mongoose.Document {
    payer_id: any | UserModelInterface
    amount: number
    message: string
    type: string
    payee_id: any | UserModelInterface
    balance_before: number
    balance_after: number
    device_id: string
    created_at: Date
    updated_at: Date
}

export default mongoose.model<TransactionModelInterface>('transaction', Schema);