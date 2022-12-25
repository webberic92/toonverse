export interface ExperimentalOptions {
    runCondition: boolean;
    checkReferrer: boolean;
    message: string;
}
export declare const UNAUTHORIZED_PARTNER_ERROR = "You are not whitelisted for experimental features";
export declare function experimental<T>(callback: () => Promise<T>, options: ExperimentalOptions): Promise<T>;
