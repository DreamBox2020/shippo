import { IPermissionAccess } from '../types';
import { ResponsePack } from '../helpers';
interface IRequestResource {
    wxCode?: string;
}
interface IResponseResource {
    passport: string;
    uid: number;
    access: IPermissionAccess[];
}
export declare const create: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
