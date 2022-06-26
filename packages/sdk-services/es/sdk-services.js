import { Request } from '@shippo/sdk-utils';

var request = new Request({
  baseURL: '',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

var create$6 = function create(data) {
  return request.request({
    url: '/passport/create',
    method: 'POST',
    data: data
  });
};

var passport = /*#__PURE__*/Object.freeze({
__proto__: null,
create: create$6
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

var create$5 = function create(data) {
  return request.request({
    url: '/user/create',
    method: 'POST',
    data: data
  });
};

var user = /*#__PURE__*/Object.freeze({
__proto__: null,
login: login,
logout: logout,
find_all: find_all$3,
update_user_role: update_user_role,
create: create$5
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

var find_all$2 = function find_all() {
  return request.request({
    url: '/role/findAll',
    method: 'POST'
  });
};

var create$4 = function create(data) {
  return request.request({
    url: '/role/create',
    method: 'POST',
    data: data
  });
};

var update$3 = function update(data) {
  return request.request({
    url: '/role/update',
    method: 'POST',
    data: data
  });
};

var del$3 = function del(data) {
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
create: create$4,
update: update$3,
del: del$3,
update_policies: update_policies
});

var find_all$1 = function find_all() {
  return request.request({
    url: '/permissionPolicy/findAll',
    method: 'POST'
  });
};

var create$3 = function create(data) {
  return request.request({
    url: '/permissionPolicy/create',
    method: 'POST',
    data: data
  });
};

var update$2 = function update(data) {
  return request.request({
    url: '/permissionPolicy/update',
    method: 'POST',
    data: data
  });
};

var del$2 = function del(data) {
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
create: create$3,
update: update$2,
del: del$2,
find_all_ext_status: find_all_ext_status$1,
update_access: update_access
});

var find_all = function find_all() {
  return request.request({
    url: '/permissionAccess/findAll',
    method: 'POST'
  });
};

var create$2 = function create(data) {
  return request.request({
    url: '/permissionAccess/create',
    method: 'POST',
    data: data
  });
};

var update$1 = function update(data) {
  return request.request({
    url: '/permissionAccess/update',
    method: 'POST',
    data: data
  });
};

var del$1 = function del(data) {
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
create: create$2,
update: update$1,
del: del$1,
find_all_ext_status: find_all_ext_status
});

var create$1 = function create(data) {
  return request.request({
    url: '/wxArticle/create',
    method: 'POST',
    data: data
  });
};

var find$1 = function find(data) {
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

var find_all_by_wx_passport_and_comment = function find_all_by_wx_passport_and_comment() {
  return request.request({
    url: '/wxArticle/findAllByWxPassportAndComment',
    method: 'POST',
    data: {}
  });
};

var update = function update(data) {
  return request.request({
    url: '/wxArticle/update',
    method: 'POST',
    data: data
  });
};

var update_comment_switch = function update_comment_switch(data) {
  return request.request({
    url: '/wxArticle/updateCommentSwitch',
    method: 'POST',
    data: data
  });
};

var wxArticle = /*#__PURE__*/Object.freeze({
__proto__: null,
create: create$1,
find: find$1,
find_all_by_wx_passport: find_all_by_wx_passport,
find_all_by_wx_passport_and_comment: find_all_by_wx_passport_and_comment,
update: update,
update_comment_switch: update_comment_switch
});

var admin__reply = function admin__reply(data) {
  return request.request({
    url: '/wxComment/admin/reply',
    method: 'POST',
    data: data
  });
};

var create = function create(data) {
  return request.request({
    url: '/wxComment/create',
    method: 'POST',
    data: data
  });
};

var del = function del(data) {
  return request.request({
    url: '/wxComment/del',
    method: 'POST',
    data: data
  });
};

var reply = function reply(data) {
  return request.request({
    url: '/wxComment/reply',
    method: 'POST',
    data: data
  });
};

var find_by_article = function find_by_article(data) {
  return request.request({
    url: '/wxComment/findByArticle',
    method: 'POST',
    data: data
  });
};

var admin__find_by_article = function admin__find_by_article(data) {
  return request.request({
    url: '/wxComment/admin/findByArticle',
    method: 'POST',
    data: data
  });
};

var find_by_wx_passport_and_article = function find_by_wx_passport_and_article(data) {
  return request.request({
    url: '/wxComment/findByWxPassportAndArticle',
    method: 'POST',
    data: data
  });
};

var update_elected = function update_elected(data) {
  return request.request({
    url: '/wxComment/updateElected',
    method: 'POST',
    data: data
  });
};

var update_top = function update_top(data) {
  return request.request({
    url: '/wxComment/updateTop',
    method: 'POST',
    data: data
  });
};

var wxComment = /*#__PURE__*/Object.freeze({
__proto__: null,
admin__reply: admin__reply,
create: create,
del: del,
reply: reply,
find_by_article: find_by_article,
admin__find_by_article: admin__find_by_article,
find_by_wx_passport_and_article: find_by_wx_passport_and_article,
update_elected: update_elected,
update_top: update_top
});

var find = function find() {
  return request.request({
    url: '/wxPassport/find',
    method: 'POST',
    data: {}
  });
};

var update_info = function update_info(data) {
  return request.request({
    url: '/wxPassport/updateInfo',
    method: 'POST',
    data: data
  });
};

var wxPassport = /*#__PURE__*/Object.freeze({
__proto__: null,
find: find,
update_info: update_info
});

var services = {
  passport: passport,
  user: user,
  temp: temp,
  captcha: captcha,
  role: role,
  permissionPolicy: permissionPolicy,
  permissionAccess: permissionAccess,
  wxArticle: wxArticle,
  wxComment: wxComment,
  wxPassport: wxPassport,
  use: function use(config) {
    request.http = request.create(config);
  }
};

export { services };
