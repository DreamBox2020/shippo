import { combineReducers, createStore as createStore$1, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createReducer } from '@kazura/react-store';

var userReducer = createReducer('user', {
    info: { uid: 0 },
});

var reducers = combineReducers({ user: userReducer });
var createStore = function (compose) {
    compose = compose || applyMiddleware;
    var middleware = [thunkMiddleware];
    var stores = createStore$1(reducers, compose.apply(void 0, middleware));
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

export { createStore, reducers };
