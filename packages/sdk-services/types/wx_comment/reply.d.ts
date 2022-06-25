import { IWxComment } from '@shippo/types';
import { ResponsePack } from '../helpers';
interface IRequestResource {
    content: string;
    id: number;
}
interface IResponseResource extends IWxComment {
}
export declare const reply: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
