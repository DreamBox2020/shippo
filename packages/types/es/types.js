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
var __wxComment = function __wxComment() {
  return {
    id: 0,
    createdAt: '',
    content: '',
    articleId: 0,
    wxPassportId: 0,
    likeNum: 0,
    isElected: 0,
    isTop: 0,
    replyCommentId: 0
  };
};
var __wxCommentExt = function __wxCommentExt() {
  return __assign(__assign({}, __wxComment()), {
    nickname: '',
    avatarUrl: ''
  });
};
var __wxCommentExtReplyList = function __wxCommentExtReplyList() {
  return __assign(__assign({}, __wxCommentExt()), {
    replyList: []
  });
};
var __wxPassport = function __wxPassport() {
  return {
    id: 0,
    createdAt: '',
    unionId: '',
    miniProgramOpenId: '',
    offiaccountOpenId: '',
    nickname: '',
    avatarUrl: ''
  };
};

export { __passport, __permissionAccess, __permissionPolicy, __role, __user, __userExtRoleName, __userInfo, __wxArticle, __wxArticleExtOffiaccountNickname, __wxComment, __wxCommentExt, __wxCommentExtReplyList, __wxPassport };
