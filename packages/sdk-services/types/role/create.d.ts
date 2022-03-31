import { ResponsePack } from '../helpers';
interface IRequestResource {
    roleName: string;
    remark: string;
}
interface IResponseResource {
}
export declare const create: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
