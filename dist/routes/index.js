"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var controller = require("../controllers");
var index_1 = require("../middlewares/index");
var route = express.Router();
//auth
route.post('/api/auth/register', index_1.sig, controller.auth.register);
route.post('/api/auth/login', index_1.sig, controller.auth.login);
route.get('/api/user', index_1.auth, controller.user.getInfo);
route.post('/api/auth/refresh_token', controller.auth.refreshToken);
route.post('/api/user', index_1.auth, controller.user.updateInfo);
route.post('/api/user/deposit', index_1.auth, controller.transaction.deposit);
route.post('/api/user/withdraw', index_1.auth, controller.transaction.withDraw);
route.get('/api/user/transaction/:transaction_id', index_1.auth, controller.transaction.getDetailTransaction);
route.get('/api/user/transactions', index_1.auth, controller.transaction.getListTransaction);
route.get('/api/user/balance', index_1.auth, controller.user.getBalance);
route.post('/api/user/transfer', index_1.auth, controller.transaction.transfer);
route.get('/api/user/devices', index_1.auth, controller.devices.getListDevice);
route.delete('/api/user/device/:device_id', index_1.auth, controller.devices.remove);
exports.default = route;
