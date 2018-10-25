"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true, ref: 'refresh_tokens' },
    phone_number: { type: String, index: true },
    email: { type: String, index: true },
    name: String,
    password: String,
    salt: String,
    address: String,
    avatar: String,
    balance: Number,
    last_active: Date
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
exports.default = mongoose.model('users', Schema);
