import * as passport from './passport';
import * as user from './user';
import * as temp from './temp';
import * as captcha from './captcha';
import * as admin from './admin';
import * as role from './role';
import * as permissionPolicy from './permission_policy';
export * from './types';
export declare const services: {
    passport: typeof passport;
    user: typeof user;
    temp: typeof temp;
    captcha: typeof captcha;
    admin: typeof admin;
    role: typeof role;
    permissionPolicy: typeof permissionPolicy;
    use: (config?: import("axios").AxiosRequestConfig | undefined) => void;
};
