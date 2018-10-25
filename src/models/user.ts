import * as mongoose from 'mongoose';
import { number } from 'joi';

const Schema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true, ref: 'refresh_tokens' },
    phone_number: { type: String, index: true },
    email: { type: String, index: true },
    name: String,
    password: String,
    salt: String,
    address: String,
    avatar: String,
    balance:Number,
    last_active : Date
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export interface UserModelInterface extends mongoose.Document {
    phone_number: string
    email: string
    address: string
    name: string
    avatar: string
    password: string
    salt: string
    balance: number
    last_active: Date
    created_at: Date
    updated_at: Date

}

export default mongoose.model<UserModelInterface>('users', Schema);