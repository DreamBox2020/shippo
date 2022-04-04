import { IPermissionAccess } from '@shippo/sdk-services';
export interface IUserStore {
    info: {
        uid: number;
        access: IPermissionAccess[];
    };
}
export declare const userReducer: (store: IUserStore | undefined, action: import("@kazura/react-store").StoreAction<IUserStore>) => IUserStore;
