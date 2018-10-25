"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = new mongoose.Schema({
    user_id: { type: String, index: true, ref: 'users' },
    device_id: { type: String, index: true, ref: 'devices' },
    refresh_token: { type: String, index: true }
});
exports.default = mongoose.model('refresh_tokens', Schema);
