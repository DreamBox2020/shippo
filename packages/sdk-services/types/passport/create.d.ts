import { ResponsePack } from '../helpers';
interface IResponseResource {
    passport: string;
    uid: number;
}
export declare const create: () => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
