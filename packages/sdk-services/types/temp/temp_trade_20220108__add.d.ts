import { ResponsePack } from '../helpers';
interface IRequestResource {
    trade1: string;
    trade2: string;
    qq: string;
    phone: string;
}
export declare const temp_trade_20220108__add: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<string>>>;
export {};
