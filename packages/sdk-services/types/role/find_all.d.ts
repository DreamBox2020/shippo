import { IRole } from '../types';
import { ResponsePack } from '../helpers';
interface IResponseResource extends Array<IRole> {
}
export declare const find_all: () => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
