import { ResponsePack } from '../helpers';
interface IRequestResource {
    phone: string;
    code: string;
}
interface IResponseResource {
    passport: string;
    uid: number;
}
export declare const login: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
