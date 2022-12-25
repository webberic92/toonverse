import { EthNetworkName } from 'magic-sdk';
interface MagicConfig {
    publishableKey: string;
    network: EthNetworkName;
}
export declare const getMagicConfig: () => MagicConfig;
export declare const magicClient: () => import("@magic-sdk/provider").InstanceWithExtensions<import("@magic-sdk/provider").SDKBase, import("magic-sdk").MagicSDKExtensionsOption<string>>;
export declare const createMagicProvider: (magic?: import("@magic-sdk/provider").InstanceWithExtensions<import("@magic-sdk/provider").SDKBase, import("magic-sdk").MagicSDKExtensionsOption<string>>) => Promise<import("@magic-sdk/provider/dist/types/modules/rpc-provider").RPCProviderModule & import("web3-core").AbstractProvider>;
export {};
