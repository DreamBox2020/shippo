import { ResponsePack } from '../helpers';
import { IWxArticleExtOffiaccountNickname } from '@shippo/types';
interface IRequestResource {
    id: number;
}
interface IResponseResource extends IWxArticleExtOffiaccountNickname {
}
export declare const find: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
