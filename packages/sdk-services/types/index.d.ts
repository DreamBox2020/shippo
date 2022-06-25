import { HttpRequestConfig } from '@shippo/sdk-utils';
import * as passport from './passport';
import * as user from './user';
import * as temp from './temp';
import * as captcha from './captcha';
import * as admin from './admin';
import * as role from './role';
import * as permissionPolicy from './permission_policy';
import * as permissionAccess from './permission_access';
import * as wxArticle from './wx_article';
import * as wxComment from './wx_comment';
export declare const services: {
    passport: typeof passport;
    user: typeof user;
    temp: typeof temp;
    captcha: typeof captcha;
    admin: typeof admin;
    role: typeof role;
    permissionPolicy: typeof permissionPolicy;
    permissionAccess: typeof permissionAccess;
    wxArticle: typeof wxArticle;
    wxComment: typeof wxComment;
    use: (config?: HttpRequestConfig) => void;
};
