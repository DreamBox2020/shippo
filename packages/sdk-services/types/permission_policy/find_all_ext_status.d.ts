import { IPermissionPolicy } from '@shippo/types';
import { ResponsePack } from '../helpers';
interface IRequestResource {
    id: number;
}
interface IResponseResource extends Array<IPermissionPolicy & {
    status: boolean;
}> {
}
export declare const find_all_ext_status: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<IResponseResource>>>;
export {};
