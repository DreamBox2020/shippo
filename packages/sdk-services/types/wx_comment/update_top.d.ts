import { ResponsePack } from '../helpers';
interface IRequestResource {
    id: string;
    isTop: number;
}
interface IResponseResource {
}
export declare const update_top: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
