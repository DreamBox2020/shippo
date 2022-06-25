import { IUserInfo } from '@shippo/types';
import { ResponsePack } from '../helpers';
interface IRequestResource {
    phone?: string;
    email?: string;
    code: string;
}
interface IResponseResource extends IUserInfo {
}
export declare const login: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
