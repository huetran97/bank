///<reference path="global.d.ts"/>
import server from '../src';
import * as chai from 'chai';
import { assert, expect } from 'chai';
import { DEVICE_ID } from './constant.string';
import * as _ from 'lodash';

chai.use(require('chai-http'));

const request = chai.request.agent(server);

describe('GET /api/user/devices', () => {
    it('should return list device', function (done) {
        request
            .get('/api/user/devices?device_id=' + DEVICE_ID)
            .set({
                'content-type': 'application/json',
                'access_token': global.access_token
            })
            .end((err, res) => {
                expect(res.body).haveOwnProperty('err');
                expect(res.body).haveOwnProperty('msg');
                expect(res.body).haveOwnProperty('data');
                assert(_.isArray(res.body.data), 'not array');
                done();
            });
    });
});

describe('DELETE', () => {
        it('should return device id was deleted', function (done) {
            request
                .del('/api/user/device/' + DEVICE_ID)
                .set({
                    'content-type': 'application/json',
                    'access_token': global.access_token
                })
                .end((err, res) => {
                    expect(res.body).haveOwnProperty('err');
                    expect(res.body).haveOwnProperty('msg');
                    expect(res.body).haveOwnProperty('data');
                    expect(res.body.data).haveOwnProperty('id');
                    done();
                });
        });
    }
);