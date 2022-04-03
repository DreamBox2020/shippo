import { ResponsePack } from '../helpers';
interface IRequestResource {
    id: number;
    policies: number[];
}
interface IResponseResource {
}
export declare const update_policies: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
