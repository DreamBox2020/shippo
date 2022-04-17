import { ResponsePack } from '../helpers';
interface IRequestResource {
    id: number;
    role: number;
}
interface IResponseResource {
}
export declare const update_user_role: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
