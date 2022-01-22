import * as passport from './passport';
import * as sms from './sms';
import * as user from './user';
import * as temp from './temp';
import * as captcha from './captcha';
export declare const services: {
    passport: typeof passport;
    sms: typeof sms;
    user: typeof user;
    temp: typeof temp;
    captcha: typeof captcha;
    use: (config?: import("axios").AxiosRequestConfig | undefined) => void;
};
