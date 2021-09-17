(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('axios'), require('uuid')) :
  typeof define === 'function' && define.amd ? define(['exports', 'axios', 'uuid'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SdkUtils = {}, global.axios, global.uuid));
}(this, (function (exports, axios, uuid) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

  var Request = /** @class */ (function () {
      function Request(config) {
          this.http = this.create(config);
      }
      Request.prototype.create = function (config) {
          var http = axios__default['default'].create(config);
          this.init(http);
          return http;
      };
      Request.prototype.init = function (http) {
          http.interceptors.request.use(function (request) {
              if (request.data && Object.prototype.toString.call(request.data) === '[object Object]') {
                  request.data = {
                      passport: localStorage.getItem('__PASSPORT'),
                      session: uuid.v4(),
                      resource: JSON.stringify(request.data),
                      sign: '',
                      other: null,
                  };
              }
              return request;
          }, function (error) {
              return Promise.reject(error);
          });
          http.interceptors.response.use(function (response) {
              if (response.data && Object.prototype.toString.call(response.data) === '[object Object]') {
                  if (!response.data.success) {
                      console.error(response.data);
                      return Promise.reject(response);
                  }
                  try {
                      response.data.resource = JSON.parse(response.data.resource);
                  }
                  catch (error) {
                      console.error(response.data);
                      console.error(error);
                      return Promise.reject(response);
                  }
              }
              return response;
          }, function (error) {
              return Promise.reject(error);
          });
      };
      Request.prototype.request = function (config) {
          return this.http.request(config);
      };
      return Request;
  }());

  /**
   * 检查手机号是否合规
   * @param phone
   * @returns
   */
  var checkPhone = function (phone) {
      var list = [
          // 移动
          // '134', // 0～8
          '135',
          '136',
          '137',
          '138',
          '139',
          // '147', // 数据卡
          // '148', // 数据卡
          '150',
          '151',
          '152',
          // '157', // 固话卡
          '158',
          '159',
          // '172', // 数据卡
          '178',
          '182',
          '183',
          '184',
          '187',
          '188',
          '195',
          '197',
          '198',
          // 联通
          '130',
          '131',
          '132',
          // '145', // 数据卡
          // '146', // 数据卡
          '155',
          '156',
          '166',
          // '171', // 副号卡
          '175',
          '176',
          '185',
          '186',
          '196',
          //电信
          '133',
          // '149', // 数据卡
          '153',
          '173',
          '177',
          '180',
          '181',
          '189',
          '190',
          '191',
          '193',
          '199',
      ];
      // 如果不是1～9开头，且不是11位数字
      if (!/^[1-9][0-9]{10}$/.test(phone)) {
          return false;
      }
      // 如果是134开头，且第四位在0～8之间
      if (/^134[0-8]/.test(phone)) {
          return true;
      }
      // 循环判断开头
      for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
          var val = list_1[_i];
          if (phone.startsWith(val))
              return true;
      }
      return false;
  };
  /**
   * 检查短信验证码是否合规
   * @param code
   * @returns
   */
  var checkSmsCode = function (code) {
      return /^[1-9][0-9]{5}$/.test(code);
  };

  exports.Request = Request;
  exports.checkPhone = checkPhone;
  exports.checkSmsCode = checkSmsCode;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
