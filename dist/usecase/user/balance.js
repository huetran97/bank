"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(request) {
    return new Promise(function (resolve, reject) {
        try {
            var user = request.user;
            return resolve({
                err: 0,
                msg: "Get balance successful",
                data: {
                    balance: user.balance
                }
            });
        }
        catch (e) {
            return reject(e);
        }
    });
}
exports.default = default_1;
