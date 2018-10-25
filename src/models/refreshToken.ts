import * as mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    user_id: { type: String, index: true, ref:'users' },
    device_id: { type: String, index: true , ref:'devices'},
    refresh_token: { type: String, index: true }
});

export interface RefreshTokenModelInterface extends mongoose.Document{
    user_id: string
    device_id: string
    refresh_token: string
}

export default mongoose.model<RefreshTokenModelInterface>('refresh_tokens', Schema);
