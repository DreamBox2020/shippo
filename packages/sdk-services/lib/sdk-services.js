'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sdkUtils = require('@shippo/sdk-utils');

var request = new sdkUtils.Request({
    baseURL: '',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

var create = function () {
    return request.request({
        url: '/passport/create',
        method: 'POST',
        data: {},
    });
};

var passport = /*#__PURE__*/Object.freeze({
  __proto__: null,
  create: create
});

var send = function (data) {
    return request.request({
        url: '/sms/send',
        method: 'POST',
        data: data,
    });
};

var sms = /*#__PURE__*/Object.freeze({
  __proto__: null,
  send: send
});

var login = function (data) {
    return request.request({
        url: '/user/login',
        method: 'POST',
        data: data,
    });
};

var user = /*#__PURE__*/Object.freeze({
  __proto__: null,
  login: login
});

var temp_trade_20220108__add = function (data) {
    return request.request({
        url: '/temp/temp_trade_20220108/add',
        method: 'POST',
        data: data,
    });
};

var temp_trade_20220108__find = function (data) {
    return request.request({
        url: '/temp/temp_trade_20220108/find',
        method: 'POST',
        data: data,
    });
};

var temp = /*#__PURE__*/Object.freeze({
  __proto__: null,
  temp_trade_20220108__add: temp_trade_20220108__add,
  temp_trade_20220108__find: temp_trade_20220108__find
});

var services = {
    passport: passport,
    sms: sms,
    user: user,
    temp: temp,
    use: function (config) {
        request.http = request.create(config);
    },
};

exports.services = services;
