import { ResponsePack } from '../helpers';
interface IRequestResource {
    accessRule: string;
    remark: string;
    accessType: string;
}
interface IResponseResource {
}
export declare const create: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
