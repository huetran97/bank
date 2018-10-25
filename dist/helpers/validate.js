"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require("joi");
var _ = require("lodash");
var Validate = /** @class */ (function () {
    function Validate(request) {
        var _this = this;
        this.joi = function (JoiObject) {
            _this.JoiObject = Joi.object().keys(JoiObject).unknown();
            return _this;
        };
        this.xor = function (data) {
            if (data === void 0) { data = []; }
            if (!_.isEmpty(data)) {
                _this.JoiObject = _this.JoiObject.xor(data);
            }
            return _this;
        };
        this.nand = function (data) {
            if (data === void 0) { data = []; }
            _this.JoiObject = _this.JoiObject.nand(data);
            return _this;
        };
        this.when = function (ref, options) {
            _this.JoiObject = _this.JoiObject.when(ref, options);
            return _this;
        };
        this.with = function (key, peers) {
            _this.JoiObject = _this.JoiObject.with(key, peers);
            return _this;
        };
        this.validate = function () {
            var validate = Joi.validate(_this.request, _this.JoiObject);
            if (validate.error) {
                validate.error.message = 'Request invalid';
                validate.error.code = 1;
                validate.error.errors = validate.error.details.map(function (detail) {
                    return detail.message;
                });
                throw validate.error;
            }
            return validate.value;
        };
        request = _.omit(request, _.filter(_.keys(request), function (key) {
            return _.isUndefined(request[key]) || _.isNaN(request[key]) || _.isNull(request[key]);
        }));
        this.request = request;
    }
    return Validate;
}());
exports.default = Validate;
