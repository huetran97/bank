"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Redis = require("ioredis");
var configs_1 = require("../configs");
var redis = new Redis(configs_1.REDIS.PORT, configs_1.REDIS.HOST);
exports.redis = redis;
