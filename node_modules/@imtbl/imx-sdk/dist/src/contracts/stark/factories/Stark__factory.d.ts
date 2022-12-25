import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { Stark } from '../Stark';
export declare class Stark__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): Stark;
}
