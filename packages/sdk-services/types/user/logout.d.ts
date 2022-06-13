import { IPermissionAccess } from '../types';
import { ResponsePack } from '../helpers';
interface IResponseResource {
    passport: string;
    uid: number;
    access: IPermissionAccess[];
}
export declare const logout: () => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
