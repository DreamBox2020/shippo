import { ResponsePack } from '../helpers';
interface IRequestResource {
    id: number;
    commentSwitch: number;
}
interface IResponseResource {
}
export declare const update_comment_switch: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
