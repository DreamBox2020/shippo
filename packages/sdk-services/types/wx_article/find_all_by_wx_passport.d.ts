import { ResponsePack } from '../helpers';
import { IWxArticleExtOffiaccountNickname } from '@shippo/types';
interface IResponseResource extends Array<IWxArticleExtOffiaccountNickname> {
}
export declare const find_all_by_wx_passport: () => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
