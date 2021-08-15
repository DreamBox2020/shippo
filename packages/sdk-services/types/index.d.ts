import * as passport from './passport';
import * as sms from './sms';
import * as user from './user';
export declare const services: {
    passport: typeof passport;
    sms: typeof sms;
    user: typeof user;
    use: (config?: import("axios").AxiosRequestConfig | undefined) => void;
};
