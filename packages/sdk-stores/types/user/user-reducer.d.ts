import { IUserInfo } from '@shippo/sdk-services';
export declare const createDefaultInfo: () => IUserInfo;
export interface IUserStore {
    info: IUserInfo;
}
export declare const userReducer: (store: IUserStore | undefined, action: import("@kazura/react-store").StoreAction<IUserStore>) => IUserStore;
