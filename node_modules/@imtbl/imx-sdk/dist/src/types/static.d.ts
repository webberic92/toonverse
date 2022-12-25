import { BigNumber } from '@ethersproject/bignumber';
import { PopulatedTransaction } from '@ethersproject/contracts';
import BN from 'bn.js';
export interface BalanceInfo {
    balance: BigNumber;
    decimal: number;
}
export declare type StarkwareAccountMapping = {
    [path: string]: string;
};
export declare type Store = {
    set(key: string, data: any): Promise<void>;
    get(key: string): Promise<any>;
    remove(key: string): Promise<void>;
};
export declare type SignatureOptions = {
    r: BN;
    s: BN;
    recoveryParam: number | null | undefined;
};
export declare type BotEnvironment = {
    numberOfBots: number;
    etherscanApiKey: string;
    testUserPrivateKey: string;
    testUserPrivateKey2: string;
    testUserStartingVaultId: number;
    testUserToken: number;
    imxHost: string;
    tokenAddress: string;
    stark: {
        layer: string;
        application: string;
        contractAddress: string;
    };
};
export declare type ApiResult = {
    code: number;
    message: string;
    result: any;
};
export declare type Transaction = PopulatedTransaction;
export declare type ExchangeProvider = 'moonpay';
