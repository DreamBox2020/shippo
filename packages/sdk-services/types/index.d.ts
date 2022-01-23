import * as passport from './passport';
import * as user from './user';
import * as temp from './temp';
import * as captcha from './captcha';
import * as admin from './admin';
export declare const services: {
    passport: typeof passport;
    user: typeof user;
    temp: typeof temp;
    captcha: typeof captcha;
    admin: typeof admin;
    use: (config?: import("axios").AxiosRequestConfig | undefined) => void;
};
