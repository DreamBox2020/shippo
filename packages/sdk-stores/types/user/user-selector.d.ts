import { IStores } from '..';
export declare const infoGetter: () => (state: IStores) => {
    uid: number;
    access: import("@shippo/sdk-services").IPermissionAccess[];
};
