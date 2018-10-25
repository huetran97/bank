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
var models = require("../../models");
var validate_1 = require("../../helpers/validate");
var Joi = require("joi");
var moment = require("moment-timezone");
function default_1(request) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var user, transactions, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    request = new validate_1.default(request)
                        .joi({
                        transaction_id: Joi.string().required()
                    }).validate();
                    user = request.user;
                    return [4 /*yield*/, models.transaction
                            .find({ _id: request.transaction_id })
                            .populate('payer_id')
                            .populate('payee_id')];
                case 1:
                    transactions = _a.sent();
                    console.log('TRANSACTION', transactions);
                    if (!transactions) {
                        throw new Error('No transactions yet');
                    }
                    return [2 /*return*/, resolve({
                            err: 0,
                            msg: 'Get list transaction user successful',
                            data: transactions.map(function (transaction) {
                                return {
                                    id: transaction._id,
                                    type: transaction.type,
                                    amount: transaction.amount,
                                    message: transaction.message,
                                    payee_id: transaction.payee_id._id,
                                    payee_name: transaction.payee_id.name,
                                    payer_id: transaction.payer_id._id,
                                    payer_name: transaction.payer_id.name,
                                    balance_before: transaction.balance_before,
                                    balance_after: transaction.balance_after,
                                    created_at: moment(transaction.created_at).unix(),
                                    updated_at: moment(transaction.updated_at).unix()
                                };
                            })
                        })];
                case 2:
                    e_1 = _a.sent();
                    return [2 /*return*/, reject(e_1)];
                case 3: return [2 /*return*/];
            }
        });
    }); });
}
exports.default = default_1;
