import { IPermissionAccess } from '../types';
import { ResponsePack } from '../helpers';
interface IRequestResource {
    phone?: string;
    email?: string;
    code: string;
}
interface IResponseResource {
    passport: string;
    uid: number;
    access: IPermissionAccess[];
}
export declare const login: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
