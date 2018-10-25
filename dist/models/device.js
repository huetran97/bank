"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = new mongoose.Schema({
    device_id: { type: String, index: true, ref: 'refresh_tokens' },
    user_id: { type: String, index: true, ref: 'refresh_tokens' },
    device_name: String,
    device_token: String,
    last_active: Date
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
exports.default = mongoose.model('device', Schema);
