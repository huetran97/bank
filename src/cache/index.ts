import * as Redis from 'ioredis';
import { REDIS } from '../configs';

const redis = new Redis(REDIS.PORT, REDIS.HOST);
export {redis}