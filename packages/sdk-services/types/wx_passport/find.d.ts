import { ResponsePack } from '../helpers';
import { IWxPassport } from '@shippo/types';
interface IResponseResource extends IWxPassport {
}
export declare const find: () => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
