import { Http } from '@shippo/sdk-utils';
import * as passport from './passport';
import * as sms from './sms';
import * as user from './user';
export declare const services: {
    passport: typeof passport;
    sms: typeof sms;
    user: typeof user;
};
export declare const use: (http: Http) => void;
