import { IUserStore } from './user-reducer';
export declare const userUpdateInfo: (info: {
    uid: number;
    access: import("@shippo/sdk-services").IPermissionAccess[];
}) => import("@kazura/react-store").StoreAction<IUserStore>;
