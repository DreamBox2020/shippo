import axios from 'axios';
import { v4 } from 'uuid';

var Request = /** @class */ (function () {
    function Request(config) {
        this.http = this.create(config);
    }
    Request.prototype.create = function (config) {
        var http = axios.create(config);
        this.init(http);
        return http;
    };
    Request.prototype.init = function (http) {
        http.interceptors.request.use(function (request) {
            if (request.data && Object.prototype.toString.call(request.data) === '[object Object]') {
                request.data = {
                    passport: localStorage.getItem('__PASSPORT'),
                    session: v4(),
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

export { Request };
