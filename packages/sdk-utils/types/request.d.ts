import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
export declare type Http = AxiosInstance;
export declare type HttpRequestConfig = AxiosRequestConfig;
export declare type HttpResponse<T = any> = AxiosResponse<T>;
export interface RequestPack<T = string> {
    passport: string;
    session: string;
    resource: T;
    sign: string;
    other: null;
}
export interface ResponsePack<T = string> {
    code: number;
    message: string;
    success: boolean;
    session: string;
    resource: T;
    sign: string;
    other: null;
}
export declare class Request {
    http: Http;
    constructor(config?: HttpRequestConfig);
    create(config?: HttpRequestConfig): AxiosInstance;
    init(http: Http): void;
    request<T = any>(config: HttpRequestConfig): Promise<HttpResponse<T>>;
}
