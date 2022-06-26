import { ResponsePack } from '../helpers';
interface IRequestResource {
    id: string;
}
interface IResponseResource {
}
export declare const del: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
