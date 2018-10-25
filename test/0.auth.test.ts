///<reference path="global.d.ts"/>

import server from '../src';
import * as chai from 'chai';
import { expect } from 'chai';
import {
    ADDRESS,
    DEVICE_ID,
    DEVICE_NAME,
    DEVICE_TOKEN,
    EMAIL, EMAIL_PAYEE,
    NAME, NAME_PAYEE,
    PASSWORD,
    PHONE_NUMBER, PHONE_NUMBER_PAYEE, SIG,
    TS
} from './constant.string';

chai.use(require('chai-http'));

const request = chai.request.agent(server);

describe('Auth API', () => {
    describe('/POST api/auth/register', () => {
        it('should return access token', (done) => {
            request
                .post('/api/auth/register')
                .set({
                    'content-type': 'application/json'
                })
                .send({
                    'phone_number': PHONE_NUMBER,
                    'email': EMAIL,
                    'name': NAME,
                    'address': ADDRESS,
                    'device_id': DEVICE_ID,
                    'device_name': DEVICE_NAME,
                    'device_token': DEVICE_TOKEN,
                    'password': PASSWORD,
                    'ts': TS,
                    'sig': SIG
                })
                .end((err, res) => {
                    expect(res.body).haveOwnProperty('err');
                    expect(res.body).haveOwnProperty('msg');
                    expect(res.body).haveOwnProperty('data');
                    expect(res.body.data).haveOwnProperty('access_token');
                    expect(res.body.data).haveOwnProperty('token_type').to.equal('Bearer');
                    expect(res.body.data).haveOwnProperty('id');
                    expect(res.body.data).haveOwnProperty('refresh_token');
                    done();
                });
        });
    });

    //register payee
    describe('/POST api/auth/register', () => {
        it('should return access token', (done) => {
            request
                .post('/api/auth/register')
                .set({
                    'content-type': 'application/json'
                })
                .send({
                    'phone_number': PHONE_NUMBER_PAYEE,
                    'email': EMAIL_PAYEE,
                    'name': NAME_PAYEE,
                    'address': ADDRESS,
                    'device_id': DEVICE_ID,
                    'device_name': DEVICE_NAME,
                    'device_token': DEVICE_TOKEN,
                    'password': PASSWORD,
                    'ts': TS,
                    'sig': SIG
                })
                .end((err, res) => {
                    expect(res.body).haveOwnProperty('err');
                    expect(res.body).haveOwnProperty('msg');
                    expect(res.body).haveOwnProperty('data');
                    expect(res.body.data).haveOwnProperty('access_token');
                    expect(res.body.data).haveOwnProperty('token_type').to.equal('Bearer');
                    expect(res.body.data).haveOwnProperty('id');
                    expect(res.body.data).haveOwnProperty('refresh_token');

                    global.payee_id= res.body.data.id;
                    done();
                });
        });
    });


    describe('/POST /api/auth/login', () => {
        it('should return access token', function (done) {
            request
                .post('/api/auth/login')
                .set({
                    'content-type': 'application/json'
                })
                .send({
                    'phone_number': PHONE_NUMBER,
                    'password': PASSWORD,
                    'device_id': DEVICE_ID,
                    'device_name': DEVICE_NAME,
                    'device_token': DEVICE_TOKEN,
                    'ts': TS,
                    'sig': SIG
                })
                .end((err, res) => {
                    expect(res.body).haveOwnProperty('err');
                    expect(res.body).haveOwnProperty('msg');
                    expect(res.body).haveOwnProperty('data');
                    expect(res.body.data).haveOwnProperty('access_token');
                    expect(res.body.data).haveOwnProperty('expired_in');
                    expect(res.body.data).haveOwnProperty('refresh_token');
                    expect(res.body.data).haveOwnProperty('id');
                    expect(res.body.data).haveOwnProperty('token_type').to.equals('Bearer');

                    global.access_token = res.body.data.access_token;
                    global.refresh_token = res.body.data.refresh_token;

                    done();
                });
        });
    });
    describe('POST /api/auth/refresh_token', ()=>{
        it('should return new access_token', function (done) {
            request
                .post('/api/auth/refresh_token')
                .set({
                    'content-type': 'application/json'
                })
                .send({
                    "refresh_token":global.refresh_token,
                    "ts":TS,
                    "device_id":DEVICE_ID,
                    "sig":SIG
                })
                .end((err, res)=>{
                    expect(res.body).haveOwnProperty('err');
                    expect(res.body).haveOwnProperty('msg');
                    expect(res.body).haveOwnProperty('data');
                    expect(res.body.data).haveOwnProperty('access_token');
                    expect(res.body.data).haveOwnProperty('expired_in');
                    expect(res.body.data).haveOwnProperty('token_type').to.equals('Bearer');
                    done()
                })
        });
    })
});