import { ResponsePack } from '../helpers';
interface IRequestResource {
    id: number;
    roleName: string;
    remark: string;
}
interface IResponseResource {
}
export declare const update: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
