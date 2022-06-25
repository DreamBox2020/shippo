import { IPagination, IUserExtRoleName } from '@shippo/types';
import { ResponsePack } from '../helpers';
interface IRequestResource extends Partial<IPagination> {
    id?: number;
    phone?: string;
    email?: string;
    nickname?: string;
}
interface IResponseResource extends Required<IPagination> {
    items: IUserExtRoleName[];
}
export declare const find_all: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
