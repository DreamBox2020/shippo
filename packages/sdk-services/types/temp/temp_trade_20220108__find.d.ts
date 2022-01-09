import { ResponsePack } from '../helpers';
interface IRequestResource {
    qq: string;
}
interface IResponseResource extends Array<{
    id: string;
    type: number;
    amount: number;
    status: number;
    qq: string;
    phone: string;
    time: string;
}> {
}
export declare const temp_trade_20220108__find: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
