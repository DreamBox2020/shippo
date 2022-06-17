import { IUserInfo } from '../types';
import { ResponsePack } from '../helpers';
interface IResponseResource extends IUserInfo {
}
export declare const logout: () => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
