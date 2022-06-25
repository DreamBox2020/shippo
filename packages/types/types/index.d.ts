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
    wxPassportId: number;
}
export declare const __user: () => IUser;
export interface IPagination {
    current: number;
    pageSize: number;
    total: number;
}
export interface IUserExtRoleName extends IUser {
    roleName: string;
}
export declare const __userExtRoleName: () => IUserExtRoleName;
export interface IWxArticle {
    id: number;
    createdAt: string;
    title: string;
    url: string;
    image1: string;
    image2: string;
    commentSwitch: number;
    offiaccountId: number;
    wxPassportId: number;
}
export declare const __wxArticle: () => IWxArticle;
export interface IWxArticleExtOffiaccountNickname extends IWxArticle {
    offiaccountNickname: string;
}
export declare const __wxArticleExtOffiaccountNickname: () => IWxArticleExtOffiaccountNickname;
export interface IPassport {
    id: number;
    createdAt: string;
    token: string;
    userId: number;
    ip: string;
    ua: string;
    client: number;
    wxPassportId: number;
}
export declare const __passport: () => IPassport;
export interface IUserInfo {
    access: Array<IPermissionAccess>;
    user: IUser;
    passport: string;
    uid: number;
}
export declare const __userInfo: () => IUserInfo;
export interface IWxComment {
    id: number;
    createdAt: string;
    content: string;
    articleId: number;
    wxPassportId: number;
    likeNum: number;
    isElected: number;
    isTop: number;
    replyCommentId: number;
}
export declare const __wxComment: () => IWxComment;
export interface IWxCommentExt extends IWxComment {
    nickname: string;
    avatarUrl: string;
}
export declare const __wxCommentExt: () => IWxCommentExt;
export interface IWxCommentExtReplyList extends IWxCommentExt {
    replyList: IWxCommentExt[];
}
export declare const __wxCommentExtReplyList: () => IWxCommentExtReplyList;
export interface IWxPassport {
    id: number;
    createdAt: string;
    unionId: string;
    miniProgramOpenId: string;
    offiaccountOpenId: string;
    nickname: string;
    avatarUrl: string;
}
export declare const __wxPassport: () => IWxPassport;
