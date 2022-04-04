import { Middleware, Action, AnyAction, Dispatch, StoreEnhancer } from 'redux';
import { ThunkAction } from 'redux-thunk';
export * from './helpers';
export declare const reducers: import("redux").Reducer<import("redux").CombinedState<{
    user: import("./user/user-reducer").IUserStore;
}>, import("@kazura/react-store").StoreAction<import("./user/user-reducer").IUserStore>>;
export declare type IStores = ReturnType<typeof reducers>;
export interface ThunkDispatch<A extends Action = AnyAction> {
    <TReturnType = any, TState = any, TExtraThunkArg = any>(thunkAction: ThunkAction<TReturnType, TState, TExtraThunkArg, A>): TReturnType;
}
export declare type AppThunk<ReturnType = void> = ThunkAction<ReturnType, IStores, unknown, Action<string>>;
export declare const createStore: (compose?: ((...middleware: Middleware[]) => StoreEnhancer) | undefined) => {
    stores: import("redux").Store<import("redux").EmptyObject & {
        user: import("./user/user-reducer").IUserStore;
    }, import("@kazura/react-store").StoreAction<import("./user/user-reducer").IUserStore>>;
    thunkDispatch: ThunkDispatch<AnyAction>;
    dispatch: Dispatch<AnyAction>;
    selector: <T>(selector: (store: IStores) => T) => T;
};
