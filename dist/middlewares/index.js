"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var jsonwebtoken_1 = require("jsonwebtoken");
var index_1 = require("../helpers/index");
var index_2 = require("../cache/index");
var models = require("../models");
var Exeption_1 = require("../exeptions/Exeption");
var ExeptionCode_1 = require("../exeptions/ExeptionCode");
var ExeptionCode_2 = require("../exeptions/ExeptionCode");
var configs_1 = require("../configs");
exports.auth = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var body, access_token, device_id, decode, user_id, device, user, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                console.log(req.headers);
                body = void 0;
                if (req.method === 'GET') {
                    body = req.query;
                }
                else if (req.method === 'POST') {
                    body = req.body;
                }
                else if (req.method === 'DELETE') {
                    body = req.params;
                }
                access_token = req.headers.access_token;
                console.log(body);
                if (!access_token) {
                    throw new Exeption_1.default('Missing access_token!', ExeptionCode_1.default.ERROR_MISSING_TOKEN);
                }
                device_id = body.device_id;
                if (!device_id) {
                    throw new Error('Missing device_id!');
                }
                decode = jwt.verify(access_token, configs_1.JWT_SECRET);
                user_id = decode.user_id;
                return [4 /*yield*/, models.device.findOne({ device_id: device_id, user_id: user_id })];
            case 1:
                device = _a.sent();
                if (!device) {
                    throw new Error('Session Expired');
                }
                return [4 /*yield*/, index_2.redis.get('user_' + user_id)];
            case 2:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 5];
                return [4 /*yield*/, models.user.findOne({
                        _id: user_id
                    })];
            case 3:
                user = _a.sent();
                if (!user) {
                    throw new Error('Wrong username!');
                }
                user = JSON.stringify(user.toJSON());
                return [4 /*yield*/, index_2.redis.setex('user_' + user_id, 180, user)];
            case 4:
                _a.sent();
                console.log("USER:", user);
                _a.label = 5;
            case 5:
                res.locals.user = JSON.parse(user);
                next();
                return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                if (err_1 instanceof jsonwebtoken_1.TokenExpiredError) {
                    next(new Exeption_1.default('Token is expried', ExeptionCode_2.default.ERROR_TOKEN_EXPIRED));
                }
                return [2 /*return*/, next(err_1)];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.sig = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var body, sig_body, data_1, sig_data_1, sig_1, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                body = req.body;
                if (!body.sig || !body.ts) {
                    throw new Error('missing require hash');
                }
                sig_body = body.sig;
                delete body.sig;
                return [4 /*yield*/, index_1.sortAnObjectByKey(body)];
            case 1:
                data_1 = _a.sent();
                sig_data_1 = [];
                Object.keys(data_1).map(function (key) {
                    sig_data_1.push(key + '=' + data_1[key]);
                });
                sig_1 = index_1.sha1(sig_data_1.join(''));
                console.log('sig', sig_1);
                // if (sig !== sig_body) {
                //     throw new Error('Sig is invalid!');
                // }
                next();
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, next(err_2)];
            case 3: return [2 /*return*/];
        }
    });
}); };
