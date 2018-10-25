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
var models = require("../../models");
var cache_1 = require("../../cache");
var moment = require("moment-timezone");
function default_1(request) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var user_data, payye, transaction, user, payee_data, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    request = new validate_1.default(request)
                        .joi({
                        payee_id: Joi.any().required(),
                        amount: Joi.number().required(),
                        message: Joi.string().required(),
                    }).validate();
                    user_data = request.user;
                    return [4 /*yield*/, models.user.findOne({ _id: request.payee_id })];
                case 1:
                    payye = _a.sent();
                    if (request.payee_id === user_data._id || !payye) {
                        throw new Error('Payee is invalid');
                    }
                    ;
                    transaction = new models.transaction();
                    transaction.payer_id = user_data._id;
                    transaction.amount = request.amount;
                    transaction.type = 'TRANSFER';
                    transaction.device_id = request.device_id;
                    transaction.payee_id = request.payee_id;
                    transaction.balance_before = user_data.balance;
                    transaction.balance_after = user_data.balance - request.amount;
                    if (transaction.balance_after < 50000) {
                        throw new Error('Invalid amount entered');
                    }
                    transaction.message = request.message;
                    return [4 /*yield*/, transaction.save()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, models.user.findOne({ _id: user_data._id })];
                case 3:
                    user = _a.sent();
                    user.balance = transaction.balance_after;
                    return [4 /*yield*/, user.save()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, cache_1.redis.setex('user_' + user._id, 180, JSON.stringify(user.toJSON()))];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, models.user.findOne({ _id: request.payee_id })];
                case 6:
                    payee_data = _a.sent();
                    payee_data.balance += request.amount;
                    return [4 /*yield*/, payee_data.save()];
                case 7:
                    _a.sent();
                    return [2 /*return*/, resolve({
                            err: 0,
                            msg: 'Successful Transfer',
                            data: {
                                id: transaction._id,
                                type: transaction.type,
                                amount: transaction.amount,
                                device_id: transaction.device_id,
                                message: transaction.message,
                                payee_id: transaction.payee_id,
                                payee_name: payee_data.name,
                                payer_id: user_data._id,
                                payer_name: user_data.name,
                                balance_before: transaction.balance_before,
                                balance_after: transaction.balance_after,
                                created_at: moment(transaction.created_at).unix(),
                                updated_at: moment(transaction.updated_at).unix()
                            }
                        })];
                case 8:
                    e_1 = _a.sent();
                    return [2 /*return*/, reject(e_1)];
                case 9: return [2 /*return*/];
            }
        });
    }); });
}
exports.default = default_1;
