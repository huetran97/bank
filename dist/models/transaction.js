"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = new mongoose.Schema({
    payer_id: { type: String, index: true, ref: 'users' },
    amount: Number,
    type: { type: String, index: true },
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
exports.default = mongoose.model('transaction', Schema);
