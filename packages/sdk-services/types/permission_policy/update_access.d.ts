import { ResponsePack } from '../helpers';
interface IRequestResource {
    id: number;
    access: number[];
}
interface IResponseResource {
}
export declare const update_access: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
