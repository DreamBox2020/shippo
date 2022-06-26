import { ResponsePack } from '../helpers';
import { IWxArticle } from '@shippo/types';
interface IRequestResource {
    id: number;
    url: string;
}
interface IResponseResource extends IWxArticle {
}
export declare const update: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
