"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var env_path = path.join(__dirname, '../../.env');
if (process.env.NODE_ENV === 'test') {
    env_path = path.join(__dirname, '../../.env.test');
}
require('dotenv-safe').load({
    allowEmptyValues: true,
    path: env_path,
    sample: path.join(__dirname, '../../.env.example')
});
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.MONGO_URI = process.env.MONGO_URI;
exports.REDIS = {
    HOST: process.env.REDIS_HOST,
    PORT: process.env.REDIS_PORT
};
exports.USER_CONFIG = {
    REDIS_USER: 'USER_'
};
