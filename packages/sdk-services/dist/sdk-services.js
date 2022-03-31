(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@shippo/sdk-utils')) :
  typeof define === 'function' && define.amd ? define(['exports', '@shippo/sdk-utils'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SdkServices = {}, global.sdkUtils));
})(this, (function (exports, sdkUtils) { 'use strict';

  var request = new sdkUtils.Request({
      baseURL: '',
      timeout: 5000,
      headers: {
          'Content-Type': 'application/json',
      },
  });

  var create$1 = function () {
      return request.request({
          url: '/passport/create',
          method: 'POST',
          data: {},
      });
  };

  var passport = /*#__PURE__*/Object.freeze({
    __proto__: null,
    create: create$1
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

  var temp_trade_20220108__find_no_exist = function (data) {
      return request.request({
          url: '/temp/temp_trade_20220108/findNoExist',
          method: 'POST',
          data: data,
      });
  };

  var temp = /*#__PURE__*/Object.freeze({
    __proto__: null,
    temp_trade_20220108__add: temp_trade_20220108__add,
    temp_trade_20220108__find: temp_trade_20220108__find,
    temp_trade_20220108__find_no_exist: temp_trade_20220108__find_no_exist
  });

  var send = function (data) {
      return request.request({
          url: '/captcha/send',
          method: 'POST',
          data: data,
      });
  };

  var captcha = /*#__PURE__*/Object.freeze({
    __proto__: null,
    send: send
  });

  var user__create = function (data) {
      return request.request({
          url: '/admin/user/create',
          method: 'POST',
          data: data,
      });
  };

  var admin = /*#__PURE__*/Object.freeze({
    __proto__: null,
    user__create: user__create
  });

  var find_all = function () {
      return request.request({
          url: '/role/findAll',
          method: 'POST',
      });
  };

  var create = function (data) {
      return request.request({
          url: '/role/create',
          method: 'POST',
          data: data,
      });
  };

  var update = function (data) {
      return request.request({
          url: '/role/update',
          method: 'POST',
          data: data,
      });
  };

  var del = function (data) {
      return request.request({
          url: '/role/del',
          method: 'POST',
          data: data,
      });
  };

  var role = /*#__PURE__*/Object.freeze({
    __proto__: null,
    find_all: find_all,
    create: create,
    update: update,
    del: del
  });

  var find_all_ext_status = function (data) {
      return request.request({
          url: '/permissionPolicy/findAllExtStatus',
          method: 'POST',
          data: data,
      });
  };

  var permissionPolicy = /*#__PURE__*/Object.freeze({
    __proto__: null,
    find_all_ext_status: find_all_ext_status
  });

  var __role = function () { return ({
      id: 0,
      createdAt: '',
      roleName: '',
      remark: '',
  }); };
  var __permissionPolicy = function () { return ({
      id: 0,
      createdAt: '',
      policyName: '',
      remark: '',
  }); };

  var services = {
      passport: passport,
      user: user,
      temp: temp,
      captcha: captcha,
      admin: admin,
      role: role,
      permissionPolicy: permissionPolicy,
      use: function (config) {
          request.http = request.create(config);
      },
  };

  exports.__permissionPolicy = __permissionPolicy;
  exports.__role = __role;
  exports.services = services;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
