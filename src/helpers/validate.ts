import * as Joi from 'joi';
import * as _ from 'lodash';

export default class Validate {
    private request;
    private JoiObject;

    constructor(request) {
        request = _.omit(request, _.filter(_.keys(request), function (key) {
            return _.isUndefined(request[key]) || _.isNaN(request[key]) || _.isNull(request[key]);
        }));

        this.request = request;
    }

    public joi = (JoiObject) => {
        this.JoiObject = Joi.object().keys(JoiObject).unknown();
        return this;
    };

    public xor = (data: string[] = []) => {
        if (!_.isEmpty(data)) {
            this.JoiObject = this.JoiObject.xor(data);
        }

        return this;
    };

    public nand = (data: string[] = []) => {
        this.JoiObject = this.JoiObject.nand(data);
        return this;
    };

    public when = (ref, options) => {
        this.JoiObject = this.JoiObject.when(ref, options);
        return this;
    };

    public with = (key, peers) => {
        this.JoiObject = this.JoiObject.with(key, peers);
        return this;
    };

    public validate = () => {
        let validate: any = Joi.validate(this.request, this.JoiObject);
        if (validate.error) {
            validate.error.message = 'Request invalid';
            validate.error.code = 1;
            validate.error.errors = validate.error.details.map(detail => {
                return detail.message;
            });

            throw validate.error;
        }

        return validate.value;
    };
}