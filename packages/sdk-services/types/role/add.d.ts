import { ResponsePack } from '../helpers';
interface IRequestResource {
    roleName: string;
    remark: string;
}
interface IResponseResource {
}
export declare const add: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
