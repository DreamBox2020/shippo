import * as passport from './passport';
import * as sms from './sms';
import * as user from './user';
import * as temp from './temp';
export declare const services: {
    passport: typeof passport;
    sms: typeof sms;
    user: typeof user;
    temp: typeof temp;
    use: (config?: import("axios").AxiosRequestConfig | undefined) => void;
};
