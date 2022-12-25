import { Signer } from '@ethersproject/abstract-signer';
import { PopulatedTransaction } from '@ethersproject/contracts';
import { BigNumber } from 'ethers';
import * as TE from 'fp-ts/TaskEither';
import { Token } from '../types';
import { ImmutableXController } from './ImmutableXController';
export declare type ImmutableXWalletParams = {
    publicApiUrl: string;
    signer: Signer;
    gasLimit?: BigNumber;
    gasPrice?: BigNumber;
    accountMappingKey?: string;
};
export declare class ImmutableXWallet {
    controller: ImmutableXController;
    private signer;
    private gasLimit?;
    private gasPrice?;
    constructor({ publicApiUrl, signer, gasLimit, gasPrice, accountMappingKey, }: ImmutableXWalletParams);
    static build(params: ImmutableXWalletParams): Promise<ImmutableXWallet>;
    static buildF(params: ImmutableXWalletParams): TE.TaskEither<Error, ImmutableXWallet>;
    incrementNonce(): void;
    getEthKey(contractAddress: string, starkPublicKey: string): TE.TaskEither<Error, string>;
    getDepositBalance(contractAddress: string, starkPublicKey: string, token: Token, vaultId: string): Promise<string>;
    getWithdrawalBalance(contractAddress: string, starkPublicKey: string, token: Token): Promise<string>;
    getBalance(owner: string, contractAddress: string): Promise<string>;
    getAllowance(contractAddress: string, owner: string, spender: string): Promise<BigNumber>;
    sendTransactionF(unsignedTrx: PopulatedTransaction): TE.TaskEither<Error, string>;
    sendTransaction(unsignedTrx: PopulatedTransaction): Promise<string>;
    getAuthenticationHeaders(): Promise<{
        'imx-timestamp': string;
        'imx-signature': string;
    }>;
}
