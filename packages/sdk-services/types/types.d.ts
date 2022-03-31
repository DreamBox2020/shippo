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
