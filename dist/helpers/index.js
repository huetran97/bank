"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
exports.sha1 = function (data) {
    return crypto.createHash('sha1').update(data).digest('hex');
};
exports.getTimeStamp = function () {
    return Math.round(Date.now() / 1000);
};
exports.randomString = function (len) {
    var charSet = 'ABCDEF012GHIJKL345MNOPQR678STUVWXYZ9';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
};
exports.sortAnObjectByKey = function (unordered) {
    return new Promise(function (resolve, reject) {
        try {
            var ordered_1 = {};
            Object.keys(unordered).sort().forEach(function (key) {
                ordered_1[key] = unordered[key];
                return resolve(ordered_1);
            });
        }
        catch (err) {
            return reject(err);
        }
    });
};
exports.joinOb = function (sorted) {
    return new Promise(function (resolve, reject) {
        try {
            var sig_data_1 = [];
            Object.keys(sorted).map(function (key) {
                sig_data_1.push(key + '=' + sorted[key]);
            });
            return resolve(sig_data_1.join(''));
        }
        catch (err) {
            return reject(err);
        }
    });
};
