import { IWxCommentExtReplyList } from '@shippo/types';
import { ResponsePack } from '../helpers';
interface IRequestResource {
    articleId: number;
}
interface IResponseResource extends Array<IWxCommentExtReplyList> {
}
export declare const admin__find_by_article: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
