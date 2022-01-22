import { ResponsePack } from '../helpers';
interface IRequestResource {
    phone?: string;
    email?: string;
}
export declare const send: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<string>>>;
export {};
