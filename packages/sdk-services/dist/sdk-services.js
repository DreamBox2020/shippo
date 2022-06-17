(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@shippo/sdk-utils')) :
typeof define === 'function' && define.amd ? define(['exports', '@shippo/sdk-utils'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SdkServices = {}, global.sdkUtils));
})(this, (function (exports, sdkUtils) { 'use strict';

var request = new sdkUtils.Request({
  baseURL: '',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

var create$4 = function create(data) {
  return request.request({
    url: '/passport/create',
    method: 'POST',
    data: data
  });
};

var passport = /*#__PURE__*/Object.freeze({
__proto__: null,
create: create$4
});

var login = function login(data) {
  return request.request({
    url: '/user/login',
    method: 'POST',
    data: data
  });
};

var logout = function logout() {
  return request.request({
    url: '/user/logout',
    method: 'POST',
    data: {}
  });
};

var find_all$3 = function find_all(data) {
  return request.request({
    url: '/user/findAll',
    method: 'POST',
    data: data
  });
};

var update_user_role = function update_user_role(data) {
  return request.request({
    url: '/user/updateUserRole',
    method: 'POST',
    data: data
  });
};

var user = /*#__PURE__*/Object.freeze({
__proto__: null,
login: login,
logout: logout,
find_all: find_all$3,
update_user_role: update_user_role
});

var temp_trade_20220108__add = function temp_trade_20220108__add(data) {
  return request.request({
    url: '/temp/temp_trade_20220108/add',
    method: 'POST',
    data: data
  });
};

var temp_trade_20220108__find = function temp_trade_20220108__find(data) {
  return request.request({
    url: '/temp/temp_trade_20220108/find',
    method: 'POST',
    data: data
  });
};

var temp_trade_20220108__find_no_exist = function temp_trade_20220108__find_no_exist(data) {
  return request.request({
    url: '/temp/temp_trade_20220108/findNoExist',
    method: 'POST',
    data: data
  });
};

var temp = /*#__PURE__*/Object.freeze({
__proto__: null,
temp_trade_20220108__add: temp_trade_20220108__add,
temp_trade_20220108__find: temp_trade_20220108__find,
temp_trade_20220108__find_no_exist: temp_trade_20220108__find_no_exist
});

var send = function send(data) {
  return request.request({
    url: '/captcha/send',
    method: 'POST',
    data: data
  });
};

var captcha = /*#__PURE__*/Object.freeze({
__proto__: null,
send: send
});

var user__create = function user__create(data) {
  return request.request({
    url: '/admin/user/create',
    method: 'POST',
    data: data
  });
};

var admin = /*#__PURE__*/Object.freeze({
__proto__: null,
user__create: user__create
});

var find_all$2 = function find_all() {
  return request.request({
    url: '/role/findAll',
    method: 'POST'
  });
};

var create$3 = function create(data) {
  return request.request({
    url: '/role/create',
    method: 'POST',
    data: data
  });
};

var update$2 = function update(data) {
  return request.request({
    url: '/role/update',
    method: 'POST',
    data: data
  });
};

var del$2 = function del(data) {
  return request.request({
    url: '/role/del',
    method: 'POST',
    data: data
  });
};

var update_policies = function update_policies(data) {
  return request.request({
    url: '/role/updatePolicies',
    method: 'POST',
    data: data
  });
};

var role = /*#__PURE__*/Object.freeze({
__proto__: null,
find_all: find_all$2,
create: create$3,
update: update$2,
del: del$2,
update_policies: update_policies
});

var find_all$1 = function find_all() {
  return request.request({
    url: '/permissionPolicy/findAll',
    method: 'POST'
  });
};

var create$2 = function create(data) {
  return request.request({
    url: '/permissionPolicy/create',
    method: 'POST',
    data: data
  });
};

var update$1 = function update(data) {
  return request.request({
    url: '/permissionPolicy/update',
    method: 'POST',
    data: data
  });
};

var del$1 = function del(data) {
  return request.request({
    url: '/permissionPolicy/del',
    method: 'POST',
    data: data
  });
};

var find_all_ext_status$1 = function find_all_ext_status(data) {
  return request.request({
    url: '/permissionPolicy/findAllExtStatus',
    method: 'POST',
    data: data
  });
};

var update_access = function update_access(data) {
  return request.request({
    url: '/permissionPolicy/updateAccess',
    method: 'POST',
    data: data
  });
};

var permissionPolicy = /*#__PURE__*/Object.freeze({
__proto__: null,
find_all: find_all$1,
create: create$2,
update: update$1,
del: del$1,
find_all_ext_status: find_all_ext_status$1,
update_access: update_access
});

var find_all = function find_all() {
  return request.request({
    url: '/permissionAccess/findAll',
    method: 'POST'
  });
};

var create$1 = function create(data) {
  return request.request({
    url: '/permissionAccess/create',
    method: 'POST',
    data: data
  });
};

var update = function update(data) {
  return request.request({
    url: '/permissionAccess/update',
    method: 'POST',
    data: data
  });
};

var del = function del(data) {
  return request.request({
    url: '/permissionAccess/del',
    method: 'POST',
    data: data
  });
};

var find_all_ext_status = function find_all_ext_status(data) {
  return request.request({
    url: '/permissionAccess/findAllExtStatus',
    method: 'POST',
    data: data
  });
};

var permissionAccess = /*#__PURE__*/Object.freeze({
__proto__: null,
find_all: find_all,
create: create$1,
update: update,
del: del,
find_all_ext_status: find_all_ext_status
});

var create = function create(data) {
  return request.request({
    url: '/wxArticle/create',
    method: 'POST',
    data: data
  });
};

var find = function find(data) {
  return request.request({
    url: '/wxArticle/find',
    method: 'POST',
    data: data
  });
};

var find_all_by_wx_passport = function find_all_by_wx_passport() {
  return request.request({
    url: '/wxArticle/findAllByWxPassport',
    method: 'POST',
    data: {}
  });
};

var wxArticle = /*#__PURE__*/Object.freeze({
__proto__: null,
create: create,
find: find,
find_all_by_wx_passport: find_all_by_wx_passport
});

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var __role = function __role() {
  return {
    id: 0,
    createdAt: '',
    roleName: '',
    remark: ''
  };
};
var __permissionPolicy = function __permissionPolicy() {
  return {
    id: 0,
    createdAt: '',
    policyName: '',
    remark: ''
  };
};
var __permissionAccess = function __permissionAccess() {
  return {
    id: 0,
    createdAt: '',
    accessRule: '',
    remark: '',
    accessType: ''
  };
};
var __user = function __user() {
  return {
    id: 0,
    createdAt: '',
    phone: '',
    email: '',
    nickname: '',
    avatar: '',
    exp: 0,
    coin: 0,
    role: 0,
    wxPassportId: 0
  };
};
var __userExtRoleName = function __userExtRoleName() {
  return __assign(__assign({}, __user()), {
    roleName: ''
  });
};
var __wxArticle = function __wxArticle() {
  return {
    id: 0,
    createdAt: '',
    title: '',
    url: '',
    image1: '',
    image2: '',
    commentSwitch: 0,
    offiaccountId: 0,
    wxPassportId: 0
  };
};
var __wxArticleExtOffiaccountNickname = function __wxArticleExtOffiaccountNickname() {
  return __assign(__assign({}, __wxArticle()), {
    offiaccountNickname: ''
  });
};
var __passport = function __passport() {
  return {
    id: 0,
    createdAt: '',
    token: '',
    userId: 0,
    ip: '',
    ua: '',
    client: 0,
    wxPassportId: 0
  };
};
var __userInfo = function __userInfo() {
  return {
    access: [],
    user: __user(),
    passport: '',
    uid: 0
  };
};

var services = {
  passport: passport,
  user: user,
  temp: temp,
  captcha: captcha,
  admin: admin,
  role: role,
  permissionPolicy: permissionPolicy,
  permissionAccess: permissionAccess,
  wxArticle: wxArticle,
  use: function use(config) {
    request.http = request.create(config);
  }
};

exports.__passport = __passport;
exports.__permissionAccess = __permissionAccess;
exports.__permissionPolicy = __permissionPolicy;
exports.__role = __role;
exports.__user = __user;
exports.__userExtRoleName = __userExtRoleName;
exports.__userInfo = __userInfo;
exports.__wxArticle = __wxArticle;
exports.__wxArticleExtOffiaccountNickname = __wxArticleExtOffiaccountNickname;
exports.services = services;

Object.defineProperty(exports, '__esModule', { value: true });

}));
