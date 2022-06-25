import { IUserInfo } from '@shippo/types';
export declare const createDefaultInfo: () => IUserInfo;
export interface IUserStore {
    info: IUserInfo;
}
export declare const userReducer: (store: IUserStore | undefined, action: import("@kazura/react-store").StoreAction<IUserStore>) => IUserStore;
