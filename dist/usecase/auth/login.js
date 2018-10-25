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
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require("joi");
var validate_1 = require("../../helpers/validate");
var index_1 = require("../../helpers/index");
var jwt = require("jsonwebtoken");
var moment = require("moment-timezone");
var models = require("../../models");
var cache_1 = require("../../cache");
var helpers_1 = require("../../helpers");
var configs_1 = require("../../configs");
function default_1(request) {
    var _this = this;
    return new Promise((function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var user_data, password, device_data, device, refresh_token_1, user, token, refresh_token, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 11, , 12]);
                    request = new validate_1.default(request)
                        .joi({
                        phone_number: Joi.string().required(),
                        password: Joi.string().required(),
                        device_id: Joi.string().required(),
                        device_name: Joi.string().optional(),
                        device_token: Joi.string().required()
                    }).validate();
                    return [4 /*yield*/, models.user.findOne({ phone_number: request.phone_number })];
                case 1:
                    user_data = _a.sent();
                    password = index_1.sha1(request.password + user_data.salt);
                    if (user_data.password !== password) {
                        throw new Error('Wrong password');
                    }
                    user_data.last_active = new Date();
                    return [4 /*yield*/, user_data.save()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, models.device.findOne({
                            device_id: request.device_id, user_id: user_data._id
                        })];
                case 3:
                    device_data = _a.sent();
                    if (!!device_data) return [3 /*break*/, 6];
                    device = new models.device();
                    device.device_id = request.device_id;
                    device.user_id = user_data._id;
                    device.device_name = request.device_name;
                    device.device_token = request.device_token;
                    device.last_active = new Date();
                    return [4 /*yield*/, device.save()];
                case 4:
                    _a.sent();
                    refresh_token_1 = new models.refresh_token();
                    refresh_token_1.user_id = user_data._id;
                    refresh_token_1.device_id = request.device_id;
                    refresh_token_1.refresh_token = index_1.sha1(user_data.phone_number + request.device_id + helpers_1.randomString(10));
                    return [4 /*yield*/, refresh_token_1.save()];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [4 /*yield*/, cache_1.redis.get('user_' + user_data._id)];
                case 7:
                    user = _a.sent();
                    if (!!user) return [3 /*break*/, 9];
                    return [4 /*yield*/, cache_1.redis.setex('user_' + user_data._id, 180, JSON.stringify(user_data.toJSON()))];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    token = jwt.sign({ user_id: user_data._id }, configs_1.JWT_SECRET, { expiresIn: '1h' });
                    return [4 /*yield*/, models.refresh_token.findOne({ user_id: user_data._id, device_id: request.device_id })];
                case 10:
                    refresh_token = _a.sent();
                    console.log('refresh_token', refresh_token);
                    return [2 /*return*/, resolve({
                            err: 0,
                            msg: 'Login successful',
                            data: {
                                access_token: token,
                                token_type: 'Bearer',
                                id: user_data._id,
                                expired_in: moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
                                refresh_token: refresh_token.refresh_token
                            }
                        })];
                case 11:
                    err_1 = _a.sent();
                    return [2 /*return*/, reject(err_1)];
                case 12: return [2 /*return*/];
            }
        });
    }); }));
}
exports.default = default_1;
