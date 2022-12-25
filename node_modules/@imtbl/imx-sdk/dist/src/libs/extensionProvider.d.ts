import { ExternalProvider } from '@ethersproject/providers/lib/web3-provider';
export declare const createExtensionProvider: ({ mustBeMetaMask, }: {
    mustBeMetaMask?: boolean | undefined;
}) => Promise<ExternalProvider | null>;
