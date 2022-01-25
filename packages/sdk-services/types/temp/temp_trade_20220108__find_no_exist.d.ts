import { ResponsePack } from '../helpers';
interface IRequestResource {
    list: string[];
}
interface IResponseResource extends Array<string> {
}
export declare const temp_trade_20220108__find_no_exist: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
