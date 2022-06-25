import { IUserInfo } from '@shippo/types';
import { ResponsePack } from '../helpers';
interface IRequestResource {
    wxCode?: string;
}
interface IResponseResource extends IUserInfo {
}
export declare const create: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
