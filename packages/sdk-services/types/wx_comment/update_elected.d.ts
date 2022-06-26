import { ResponsePack } from '../helpers';
interface IRequestResource {
    id: string;
    isElected: number;
}
interface IResponseResource {
}
export declare const update_elected: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
