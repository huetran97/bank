"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var routes_1 = require("./routes");
var mongoose = require("mongoose");
var http = require("http");
var configs_1 = require("./configs");
var app = express();
var server = http.createServer(app);
mongoose.connect(configs_1.MONGO_URI);
app.use(express.json());
app.use(express.urlencoded());
app.use(routes_1.default);
app.use(function (err, req, res, next) {
    res.json({
        err: err.code || 0,
        msg: err.message,
        data: null,
        debug: err
    });
});
if (process.env.NODE_ENV === 'test') {
    server.listen(3001);
}
else {
    server.listen(3000);
}
exports.default = server;
