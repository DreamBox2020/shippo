import { ResponsePack } from '../helpers';
export interface IResponseResource {
    passport: string;
    uid: number;
}
export declare const create: () => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
