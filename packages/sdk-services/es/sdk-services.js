import { Request } from '@shippo/sdk-utils';

var request = new Request({
    baseURL: '',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

var create$3 = function () {
    return request.request({
        url: '/passport/create',
        method: 'POST',
        data: {},
    });
};

var passport = /*#__PURE__*/Object.freeze({
  __proto__: null,
  create: create$3
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

var find_all$2 = function () {
    return request.request({
        url: '/role/findAll',
        method: 'POST',
    });
};

var create$2 = function (data) {
    return request.request({
        url: '/role/create',
        method: 'POST',
        data: data,
    });
};

var update$2 = function (data) {
    return request.request({
        url: '/role/update',
        method: 'POST',
        data: data,
    });
};

var del$2 = function (data) {
    return request.request({
        url: '/role/del',
        method: 'POST',
        data: data,
    });
};

var update_policies = function (data) {
    return request.request({
        url: '/role/updatePolicies',
        method: 'POST',
        data: data,
    });
};

var role = /*#__PURE__*/Object.freeze({
  __proto__: null,
  find_all: find_all$2,
  create: create$2,
  update: update$2,
  del: del$2,
  update_policies: update_policies
});

var find_all$1 = function () {
    return request.request({
        url: '/permissionPolicy/findAll',
        method: 'POST',
    });
};

var create$1 = function (data) {
    return request.request({
        url: '/permissionPolicy/create',
        method: 'POST',
        data: data,
    });
};

var update$1 = function (data) {
    return request.request({
        url: '/permissionPolicy/update',
        method: 'POST',
        data: data,
    });
};

var del$1 = function (data) {
    return request.request({
        url: '/permissionPolicy/del',
        method: 'POST',
        data: data,
    });
};

var find_all_ext_status$1 = function (data) {
    return request.request({
        url: '/permissionPolicy/findAllExtStatus',
        method: 'POST',
        data: data,
    });
};

var update_access = function (data) {
    return request.request({
        url: '/permissionPolicy/updateAccess',
        method: 'POST',
        data: data,
    });
};

var permissionPolicy = /*#__PURE__*/Object.freeze({
  __proto__: null,
  find_all: find_all$1,
  create: create$1,
  update: update$1,
  del: del$1,
  find_all_ext_status: find_all_ext_status$1,
  update_access: update_access
});

var find_all = function () {
    return request.request({
        url: '/permissionAccess/findAll',
        method: 'POST',
    });
};

var create = function (data) {
    return request.request({
        url: '/permissionAccess/create',
        method: 'POST',
        data: data,
    });
};

var update = function (data) {
    return request.request({
        url: '/permissionAccess/update',
        method: 'POST',
        data: data,
    });
};

var del = function (data) {
    return request.request({
        url: '/permissionAccess/del',
        method: 'POST',
        data: data,
    });
};

var find_all_ext_status = function (data) {
    return request.request({
        url: '/permissionAccess/findAllExtStatus',
        method: 'POST',
        data: data,
    });
};

var permissionAccess = /*#__PURE__*/Object.freeze({
  __proto__: null,
  find_all: find_all,
  create: create,
  update: update,
  del: del,
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
var __permissionAccess = function () { return ({
    id: 0,
    createdAt: '',
    accessRule: '',
    remark: '',
    accessType: '',
}); };

var services = {
    passport: passport,
    user: user,
    temp: temp,
    captcha: captcha,
    admin: admin,
    role: role,
    permissionPolicy: permissionPolicy,
    permissionAccess: permissionAccess,
    use: function (config) {
        request.http = request.create(config);
    },
};

export { __permissionAccess, __permissionPolicy, __role, services };
