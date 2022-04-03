import { ResponsePack } from '../helpers';
interface IRequestResource {
    id: number;
    accessRule: string;
    remark: string;
    accessType: string;
}
interface IResponseResource {
}
export declare const update: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
