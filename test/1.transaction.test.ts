///<reference path="global.d.ts"/>

import * as chai from 'chai';
import server from '../src';
import { DEVICE_ID } from './constant.string';
import {expect, assert} from 'chai';
import * as _ from 'lodash';
chai.use(require('chai-http'));

const request = chai.request.agent(server);

describe('Transaction API', () => {
    describe('POST /api/user/deposit', () => {
        it('should return  deposit information', function (done) {
            request
                .post('/api/user/deposit')
                .set({
                    'content-type': 'application/json',
                    'access_token': global.access_token
                })
                .send({
                    'amount': 100000,
                    'device_id': DEVICE_ID
                })
                .end((err, res) => {
                    expect(res.body).haveOwnProperty('err');
                    expect(res.body).haveOwnProperty('msg');
                    expect(res.body).haveOwnProperty('data');
                    expect(res.body.data).haveOwnProperty('id');
                    expect(res.body.data).haveOwnProperty('type');
                    expect(res.body.data).haveOwnProperty('amount');
                    expect(res.body.data).haveOwnProperty('message');
                    expect(res.body.data).haveOwnProperty('balance_before');
                    expect(res.body.data).haveOwnProperty('balance_after');
                    expect(res.body.data).haveOwnProperty('created_at');
                    expect(res.body.data).haveOwnProperty('updated_at');

                    done()

                })
        });
    });

    describe('POST /api/user/transfer', ()=>{
        it('should return transfer information', function (done) {
            request
                .post('/api/user/transfer')
                .set({
                    'content-type': 'application/json',
                    'access_token': global.access_token
                })
                .send({
                    'payee_id':global.payee_id,
                    'amount':1000,
                    'message':'Chuyen tien cho TAM',
                    'device_id': DEVICE_ID
                })
                .end((err, res)=>{
                    expect(res.body).haveOwnProperty('err');
                    expect(res.body).haveOwnProperty('msg');
                    expect(res.body).haveOwnProperty('data');
                    expect(res.body.data).haveOwnProperty('id');
                    expect(res.body.data).haveOwnProperty('type');
                    expect(res.body.data).haveOwnProperty('amount');
                    expect(res.body.data).haveOwnProperty('device_id');
                    expect(res.body.data).haveOwnProperty('message');
                    expect(res.body.data).haveOwnProperty('payee_id');
                    expect(res.body.data).haveOwnProperty('payee_name');
                    expect(res.body.data).haveOwnProperty('payer_id');
                    expect(res.body.data).haveOwnProperty('payer_name');
                    expect(res.body.data).haveOwnProperty('balance_before');
                    expect(res.body.data).haveOwnProperty('balance_after');
                    expect(res.body.data).haveOwnProperty('created_at');
                    expect(res.body.data).haveOwnProperty('updated_at');
                    done()
                })
        });
    })

    describe('POST /api/user/withdraw', ()=>{
        it('should return withdraw information', function (done) {
            request
                .post('/api/user/withdraw')
                .set({
                    'content-type': 'application/json',
                    'access_token': global.access_token
                })
                .send({
                    'amount':1000,
                    'device_id': DEVICE_ID
                })
                .end((err, res)=>{
                    expect(res.body).haveOwnProperty('err');
                    expect(res.body).haveOwnProperty('msg');
                    expect(res.body).haveOwnProperty('data');
                    expect(res.body.data).haveOwnProperty('id');
                    expect(res.body.data).haveOwnProperty('type');
                    expect(res.body.data).haveOwnProperty('device_id');
                    expect(res.body.data).haveOwnProperty('amount');
                    expect(res.body.data).haveOwnProperty('message');
                    expect(res.body.data).haveOwnProperty('balance_before');
                    expect(res.body.data).haveOwnProperty('balance_after');
                    expect(res.body.data).haveOwnProperty('created_at');
                    expect(res.body.data).haveOwnProperty('updated_at');
                    done()
                })
        });
    })

    describe('GET /api/user/transactions', ()=>{
        it('should return list transaction', function (done) {
            request
                .get('/api/user/transactions?device_id='+DEVICE_ID)
                .set({
                    'content-type': 'application/json',
                    'access_token': global.access_token
                })
                .end((err, res)=>{
                    expect(res.body).haveOwnProperty('err');
                    expect(res.body).haveOwnProperty('msg');
                    expect(res.body).haveOwnProperty('data');
                    assert(_.isArray(res.body.data), 'not array');
                    let transation = res.body.data;
                    global.transaction_id = transation[0].id;
                    done()

                })
        });
    })

    describe('GET /api/user/transaction/{transaction_id}', ()=>{
        it('should return transaction by id', function (done) {
            request
                .get('/api/user/transaction/'+global.transaction_id+'?device_id='+DEVICE_ID)
                .set({
                    'content-type':'application/json',
                    'access_token':global.access_token
                })
                .end((err, res)=>{
                    expect(res.body).haveOwnProperty('err');
                    expect(res.body).haveOwnProperty('msg');
                    expect(res.body).haveOwnProperty('data');
                    expect(res.body.data).haveOwnProperty('id');
                    expect(res.body.data).haveOwnProperty('type');
                    expect(res.body.data).haveOwnProperty('amount');
                    expect(res.body.data).haveOwnProperty('message');
                    expect(res.body.data).haveOwnProperty('device_id');
                    expect(res.body.data).haveOwnProperty('payee_id');
                    expect(res.body.data).haveOwnProperty('payee_name');
                    expect(res.body.data).haveOwnProperty('payer_id');
                    expect(res.body.data).haveOwnProperty('payer_name');
                    expect(res.body.data).haveOwnProperty('balance_before');
                    expect(res.body.data).haveOwnProperty('balance_after');
                    expect(res.body.data).haveOwnProperty('created_at');
                    expect(res.body.data).haveOwnProperty('updated_at');
                    done()
                })
        });
    })
})