import { IWxComment } from '@shippo/types';
import { ResponsePack } from '../helpers';
interface IRequestResource {
    content: string;
    articleId: number;
}
interface IResponseResource extends IWxComment {
}
export declare const create: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
