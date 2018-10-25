const path = require('path');

let env_path = path.join(__dirname, '../../.env');

if (process.env.NODE_ENV === 'test') {
    env_path = path.join(__dirname, '../../.env.test');
}

require('dotenv-safe').load({
    allowEmptyValues: true,
    path: env_path,
    sample: path.join(__dirname, '../../.env.example')
});

declare var process: any;

export const JWT_SECRET = process.env.JWT_SECRET;
export const MONGO_URI  = process.env.MONGO_URI;

export const REDIS = {
    HOST: process.env.REDIS_HOST,
    PORT: process.env.REDIS_PORT
};

export const USER_CONFIG = {
    REDIS_USER: 'USER_'
};
