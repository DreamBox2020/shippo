'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var redux = require('redux');
var thunkMiddleware = require('redux-thunk');
var reactStore = require('@kazura/react-store');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var thunkMiddleware__default = /*#__PURE__*/_interopDefaultLegacy(thunkMiddleware);

var userReducer = reactStore.createReducer('user', {
    info: { uid: 0 },
});

var reducers = redux.combineReducers({ user: userReducer });
var createStore = function (compose) {
    compose = compose || redux.applyMiddleware;
    var middleware = [thunkMiddleware__default['default']];
    var stores = redux.createStore(reducers, compose.apply(void 0, middleware));
    var thunkDispatch = function (action) { return stores.dispatch(action); };
    var dispatch = function (action) { return stores.dispatch(action); };
    var selector = function (selector) { return selector(stores.getState()); };
    return {
        stores: stores,
        thunkDispatch: thunkDispatch,
        dispatch: dispatch,
        selector: selector,
    };
};

exports.createStore = createStore;
exports.reducers = reducers;
