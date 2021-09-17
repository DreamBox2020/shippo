import { Action } from 'redux';
export declare const userUpdateInfo: () => import("redux-thunk").ThunkAction<Promise<void>, import("redux").CombinedState<{
    user: import("./user-reducer").IUserStore;
}>, undefined, Action<string>>;
