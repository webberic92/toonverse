export declare type Instruction = 'order' | 'transfer' | 'registerUser' | 'deposit' | 'withdraw' | 'cancelOrder';
export declare type InstructionWithFee = 'orderWithFee' | 'transferWithFee';
export declare type FeeParams = {
    feeToken: string;
    feeVault: string;
    feeLimit: string;
};
export declare type LimitOrderParams = {
    vaultSell: string;
    vaultBuy: string;
    amountSell: string;
    amountBuy: string;
    nonce: string;
    expirationTimestamp: string;
    tokenSell: string;
    tokenBuy: string;
};
export declare type LimitOrderWithFeeParams = LimitOrderParams & FeeParams;
