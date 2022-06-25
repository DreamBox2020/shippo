import { ResponsePack } from '../helpers';
interface IRequestResource {
    code: string;
}
interface IResponseResource {
}
export declare const update_info: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
