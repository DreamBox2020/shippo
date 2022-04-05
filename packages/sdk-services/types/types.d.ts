export interface IRole {
    id: number;
    createdAt: string;
    roleName: string;
    remark: string;
}
export declare const __role: () => IRole;
export interface IPermissionPolicy {
    id: number;
    createdAt: string;
    policyName: string;
    remark: string;
}
export declare const __permissionPolicy: () => IPermissionPolicy;
export interface IPermissionAccess {
    id: number;
    createdAt: string;
    accessRule: string;
    remark: string;
    accessType: string;
}
export declare const __permissionAccess: () => IPermissionAccess;
export interface IUser {
    id: number;
    createdAt: string;
    phone: string;
    email: string;
    nickname: string;
    avatar: string;
    exp: number;
    coin: number;
    role: number;
}
export declare const __user: () => IUser;
