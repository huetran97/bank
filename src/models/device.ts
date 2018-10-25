import * as mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    device_id: { type: String, index: true , ref:'refresh_tokens'},
    user_id : { type: String, index: true , ref:'refresh_tokens'},
    device_name: String,
    device_token: String,
    last_active: Date
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
export  interface DeviceModelInterface extends mongoose.Document{
    device_id: string
    user_id: string
    device_name: string
    device_token: string
    last_active: Date
    created_at: Date
    updated_at: Date
}
export default mongoose.model<DeviceModelInterface>('device', Schema);