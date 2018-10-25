"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment-timezone");
function default_1(request) {
    return new Promise((function (resolve, reject) {
        try {
            var user = request.user;
            return resolve({
                err: 0,
                msg: 'Get info sucessfully',
                data: {
                    name: user.name,
                    phone_number: user.phone_number,
                    email: user.email,
                    avatar: user.avatar,
                    address: user.address,
                    balance: user.balance,
                    last_active: moment(user.last_active).unix(),
                    created_at: moment(user.created_at).unix(),
                    updated_at: moment(user.updated_at).unix()
                }
            });
        }
        catch (err) {
            return reject(err);
        }
    }));
}
exports.default = default_1;
