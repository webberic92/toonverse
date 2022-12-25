import { AxiosRequestConfig } from 'axios';
import * as TE from 'fp-ts/TaskEither';
import { IMXDClientMethodParams, IMXDClientMethodResults } from '../types';
export declare type ImmutableIMXDClientParams = {
    imxdPublicApiUrl: string;
};
export declare class ImmutableIMXDClient {
    private imxdPublicApiUrl;
    private agent;
    constructor(imxdPublicApiUrl: string);
    static buildF(params: ImmutableIMXDClientParams): TE.TaskEither<Error, ImmutableIMXDClient>;
    static build({ imxdPublicApiUrl }: ImmutableIMXDClientParams): Promise<ImmutableIMXDClient>;
    buildOptions(): AxiosRequestConfig;
    private get;
    private getDailyPointsBalanceF;
    getDailyPointsBalance(params: IMXDClientMethodParams.GetDailyPointsBalanceParamsTS): Promise<IMXDClientMethodResults.GetDailyPointsBalanceResultTS>;
    private decodeForFunction;
}
