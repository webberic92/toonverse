import { AxiosRequestConfig } from 'axios';
export declare class RequestClient {
    private apiKey?;
    private baseUrl;
    private agent;
    private baseOptions;
    private axiosInstance;
    constructor(baseUrl: string, enableDebug?: boolean, apiKey?: string | undefined);
    replaceApiVersion(path: string, version: string): string;
    addHeaders(options: AxiosRequestConfig, headers: {
        [key: string]: string;
    }): AxiosRequestConfig;
    addParams(options: AxiosRequestConfig, params: any): AxiosRequestConfig;
    private handleResponse;
    private handleErrors;
    get(path: string, params?: any, headers?: {
        [key: string]: string;
    }, version?: string): Promise<unknown>;
    post(path: string, data: any, headers?: {
        [key: string]: string;
    }, version?: string): Promise<unknown>;
    patch(path: string, data: any, headers?: {
        [key: string]: string;
    }, version?: string): Promise<unknown>;
    delete(path: string, data: any): Promise<unknown>;
}
