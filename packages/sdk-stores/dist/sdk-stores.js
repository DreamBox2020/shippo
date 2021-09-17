(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('redux'), require('redux-thunk'), require('@kazura/react-store')) :
  typeof define === 'function' && define.amd ? define(['exports', 'redux', 'redux-thunk', '@kazura/react-store'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SdkStores = {}, global.redux, global.thunkMiddleware, global.reactStore));
}(this, (function (exports, redux, thunkMiddleware, reactStore) { 'use strict';

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

  Object.defineProperty(exports, '__esModule', { value: true });

})));
