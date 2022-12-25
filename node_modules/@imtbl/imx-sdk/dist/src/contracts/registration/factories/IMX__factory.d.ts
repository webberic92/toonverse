import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IMX, IMXInterface } from "../IMX";
export declare class IMX__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IMXInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IMX;
}
