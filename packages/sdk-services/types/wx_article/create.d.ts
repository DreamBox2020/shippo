import { ResponsePack } from '../helpers';
import { IWxArticle } from '../types';
interface IRequestResource {
    url: string;
}
interface IResponseResource extends IWxArticle {
}
export declare const create: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
