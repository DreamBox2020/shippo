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
console.log(process.env);

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

var services = {
    passport: passport,
    sms: sms,
    user: user,
    use: function (config) {
        request.http = request.create(config);
    },
};

exports.services = services;
