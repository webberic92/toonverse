import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { ImmutableX } from "../ImmutableX";
export declare class ImmutableX__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_name: string, _symbol: string, overrides?: Overrides): Promise<ImmutableX>;
    getDeployTransaction(_name: string, _symbol: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): ImmutableX;
    connect(signer: Signer): ImmutableX__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ImmutableX;
}
