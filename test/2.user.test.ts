///<reference path="global.d.ts"/>

import * as chai from 'chai';
import { expect } from 'chai';
import server from '../src';
import { DEVICE_ID } from './constant.string';

chai.use(require('chai-http'));

const request = chai.request.agent(server);

describe('USER API', () => {

    describe('GET /api/user/balance', () => {
        it('should return balance', function (done) {
            request
                .get('/api/user/balance?device_id=' + DEVICE_ID)
                .set({
                    'content-type': 'application/json',
                    'access_token': global.access_token
                })
                .end((err, res) => {
                    expect(res.body).haveOwnProperty('err');
                    expect(res.body).haveOwnProperty('msg');
                    expect(res.body).haveOwnProperty('data');
                    expect(res.body.data).haveOwnProperty('balance');
                    done();
                });
        });
    });

    describe('GET /api/user', () => {
        it('should return user information', function (done) {
            request
                .get('/api/user?device_id=' + DEVICE_ID)
                .set({
                    'content-type': 'application/json',
                    'access_token': global.access_token
                })
                .end((err, res) => {
                    expect(res.body).haveOwnProperty('err');
                    expect(res.body).haveOwnProperty('msg');
                    expect(res.body).haveOwnProperty('data');
                    expect(res.body.data).haveOwnProperty('name');
                    expect(res.body.data).haveOwnProperty('phone_number');
                    expect(res.body.data).haveOwnProperty('email');
                    expect(res.body.data).haveOwnProperty('address');
                    expect(res.body.data).haveOwnProperty('balance');
                    expect(res.body.data).haveOwnProperty('last_active');
                    expect(res.body.data).haveOwnProperty('created_at');
                    expect(res.body.data).haveOwnProperty('updated_at');
                    done();
                });
        });
    });

    describe('POST /api/user', () => {
        it('should Update and  user information', function (done) {
            request
                .post('/api/user')
                .set({
                    'content-type': 'application/json',
                    'access_token': global.access_token
                })
                .send({
                    'name': 'TAM TAM MO HO',
                    'device_id': DEVICE_ID
                })
                .end((err, res) => {
                    expect(res.body).haveOwnProperty('err');
                    expect(res.body).haveOwnProperty('msg');
                    expect(res.body).haveOwnProperty('data');
                    expect(res.body.data).haveOwnProperty('name');
                    expect(res.body.data).haveOwnProperty('phone_number');
                    expect(res.body.data).haveOwnProperty('email');
                    expect(res.body.data).haveOwnProperty('address');
                    expect(res.body.data).haveOwnProperty('balance');
                    expect(res.body.data).haveOwnProperty('last_active');
                    expect(res.body.data).haveOwnProperty('created_at');
                    expect(res.body.data).haveOwnProperty('updated_at');
                    done();
                });
        });
    });
});