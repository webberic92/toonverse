import { BigNumber } from '@ethersproject/bignumber';
import * as t from 'io-ts';
export interface EthAddressBrand {
    readonly EthAddress: unique symbol;
}
export declare const EthAddress: t.BrandC<t.StringC, EthAddressBrand>;
export declare type EthAddress = t.TypeOf<typeof EthAddress>;
export declare enum BurnAddress {
    BurnEthAddress = "0x0000000000000000000000000000000000000000"
}
export interface NumberStringBrand {
    readonly NumberString: unique symbol;
}
export declare const NumberString: t.BrandC<t.StringC, NumberStringBrand>;
export declare type NumberString = t.TypeOf<typeof NumberString>;
export interface HexadecimalStringBrand {
    readonly HexadecimalString: unique symbol;
}
export declare const HexadecimalString: t.BrandC<t.StringC, HexadecimalStringBrand>;
export declare type HexadecimalString = t.TypeOf<typeof HexadecimalString>;
export interface IntegerStringBrand {
    readonly IntegerString: unique symbol;
}
export declare const IntegerString: t.BrandC<t.BrandC<t.StringC, NumberStringBrand>, IntegerStringBrand>;
export interface PositiveIntegerStringBrand {
    readonly PositiveIntegerString: unique symbol;
}
export declare const PositiveIntegerStringC: t.BrandC<t.BrandC<t.StringC, NumberStringBrand>, PositiveIntegerStringBrand>;
export declare type PositiveIntegerString = t.TypeOf<typeof PositiveIntegerStringC>;
export interface PositiveNumberStringBrand {
    readonly PositiveNumberString: unique symbol;
}
export declare const PositiveNumberStringC: t.BrandC<t.BrandC<t.StringC, NumberStringBrand>, PositiveNumberStringBrand>;
export declare type PositiveNumberString = t.TypeOf<typeof PositiveNumberStringC>;
export interface PositiveIntegerBrand {
    readonly PositiveInteger: unique symbol;
}
export declare type PositiveIntegerT = number & PositiveIntegerBrand;
export declare const PositiveIntegerC: t.BrandC<t.NumberC, PositiveIntegerT>;
export declare type PositiveInteger = t.TypeOf<typeof PositiveIntegerC>;
export declare function fromEnum<EnumType>(enumName: string, theEnum: Record<string, string | number>): t.Type<EnumType>;
export declare const FeeCodec: t.TypeC<{
    recipient: t.BrandC<t.StringC, EthAddressBrand>;
    percentage: t.NumberC;
}>;
export declare type FeeType = t.TypeOf<typeof FeeCodec>;
export declare enum ETHTokenType {
    ETH = "ETH"
}
export declare const ETHTokenTypeT: t.Type<ETHTokenType, ETHTokenType, unknown>;
export declare const ETHTokenCodec: t.TypeC<{
    type: t.Type<ETHTokenType, ETHTokenType, unknown>;
    data: t.TypeC<{
        decimals: t.NumberC;
    }>;
}>;
export declare type ETHToken = t.TypeOf<typeof ETHTokenCodec>;
export declare enum ERC20TokenType {
    ERC20 = "ERC20"
}
export declare const ERC20TokenTypeT: t.Type<ERC20TokenType, ERC20TokenType, unknown>;
export declare const ERC20TokenCodec: t.TypeC<{
    type: t.Type<ERC20TokenType, ERC20TokenType, unknown>;
    data: t.TypeC<{
        symbol: t.StringC;
        decimals: t.NumberC;
        tokenAddress: t.BrandC<t.StringC, EthAddressBrand>;
    }>;
}>;
export declare type ERC20Token = t.TypeOf<typeof ERC20TokenCodec>;
export declare enum ERC721TokenType {
    ERC721 = "ERC721"
}
export declare const ERC721TokenTypeT: t.Type<ERC721TokenType, ERC721TokenType, unknown>;
export declare const ERC721TokenCodec: t.TypeC<{
    type: t.Type<ERC721TokenType, ERC721TokenType, unknown>;
    data: t.TypeC<{
        tokenId: t.StringC;
        tokenAddress: t.BrandC<t.StringC, EthAddressBrand>;
    }>;
}>;
export declare type ERC721Token = t.TypeOf<typeof ERC721TokenCodec>;
export declare enum MintableERC20TokenType {
    MINTABLE_ERC20 = "MINTABLE_ERC20"
}
export declare const MintableERC20TokenTypeT: t.Type<MintableERC20TokenType, MintableERC20TokenType, unknown>;
export declare const MintableERC20TokenCodec: t.TypeC<{
    type: t.Type<MintableERC20TokenType, MintableERC20TokenType, unknown>;
    data: t.TypeC<{
        id: t.StringC;
        blueprint: t.StringC;
        tokenAddress: t.UnionC<[t.StringC, t.BrandC<t.StringC, EthAddressBrand>]>;
    }>;
}>;
export declare type MintableERC20Token = t.TypeOf<typeof MintableERC20TokenCodec>;
export declare const MintFeeCodec: t.TypeC<{
    recipient: t.BrandC<t.StringC, EthAddressBrand>;
    percentage: t.NumberC;
}>;
export declare enum MintableERC721TokenType {
    MINTABLE_ERC721 = "MINTABLE_ERC721"
}
export declare const MintableERC721TokenTypeT: t.Type<MintableERC721TokenType, MintableERC721TokenType, unknown>;
export declare const MintableERC721TokenDataCodec: t.IntersectionC<[t.TypeC<{
    id: t.StringC;
    blueprint: t.StringC;
}>, t.PartialC<{
    royalties: t.ArrayC<t.TypeC<{
        recipient: t.BrandC<t.StringC, EthAddressBrand>;
        percentage: t.NumberC;
    }>>;
}>]>;
export declare type MintableERC721TokenData = t.TypeOf<typeof MintableERC721TokenDataCodec>;
export declare const MintableERC721TokenCodec: t.TypeC<{
    type: t.Type<MintableERC721TokenType, MintableERC721TokenType, unknown>;
    data: t.IntersectionC<[t.TypeC<{
        id: t.StringC;
        blueprint: t.StringC;
        tokenAddress: t.UnionC<[t.StringC, t.BrandC<t.StringC, EthAddressBrand>]>;
    }>, t.PartialC<{
        royalties: t.ArrayC<t.TypeC<{
            recipient: t.BrandC<t.StringC, EthAddressBrand>;
            percentage: t.NumberC;
        }>>;
    }>]>;
}>;
export declare type MintableERC721Token = t.TypeOf<typeof MintableERC721TokenCodec>;
export declare const TokenTypeCodec: t.UnionC<[t.Type<ERC721TokenType, ERC721TokenType, unknown>, t.Type<ERC20TokenType, ERC20TokenType, unknown>, t.Type<ETHTokenType, ETHTokenType, unknown>, t.Type<MintableERC20TokenType, MintableERC20TokenType, unknown>, t.Type<MintableERC721TokenType, MintableERC721TokenType, unknown>]>;
export declare const TokenCodec: t.UnionC<[t.TypeC<{
    type: t.Type<ETHTokenType, ETHTokenType, unknown>;
    data: t.TypeC<{
        decimals: t.NumberC;
    }>;
}>, t.TypeC<{
    type: t.Type<ERC20TokenType, ERC20TokenType, unknown>;
    data: t.TypeC<{
        symbol: t.StringC;
        decimals: t.NumberC;
        tokenAddress: t.BrandC<t.StringC, EthAddressBrand>;
    }>;
}>, t.TypeC<{
    type: t.Type<ERC721TokenType, ERC721TokenType, unknown>;
    data: t.TypeC<{
        tokenId: t.StringC;
        tokenAddress: t.BrandC<t.StringC, EthAddressBrand>;
    }>;
}>, t.TypeC<{
    type: t.Type<MintableERC20TokenType, MintableERC20TokenType, unknown>;
    data: t.TypeC<{
        id: t.StringC;
        blueprint: t.StringC;
        tokenAddress: t.UnionC<[t.StringC, t.BrandC<t.StringC, EthAddressBrand>]>;
    }>;
}>, t.TypeC<{
    type: t.Type<MintableERC721TokenType, MintableERC721TokenType, unknown>;
    data: t.IntersectionC<[t.TypeC<{
        id: t.StringC;
        blueprint: t.StringC;
        tokenAddress: t.UnionC<[t.StringC, t.BrandC<t.StringC, EthAddressBrand>]>;
    }>, t.PartialC<{
        royalties: t.ArrayC<t.TypeC<{
            recipient: t.BrandC<t.StringC, EthAddressBrand>;
            percentage: t.NumberC;
        }>>;
    }>]>;
}>]>;
export declare type Token = t.TypeOf<typeof TokenCodec>;
export declare type TokenTS = t.OutputOf<typeof TokenCodec>;
export declare const MintBodyCodec: t.TypeC<{
    etherKey: t.BrandC<t.StringC, EthAddressBrand>;
    tokens: t.ArrayC<t.TypeC<{
        type: t.Type<MintableERC721TokenType, MintableERC721TokenType, unknown>;
        data: t.IntersectionC<[t.TypeC<{
            id: t.StringC;
            blueprint: t.StringC;
            tokenAddress: t.UnionC<[t.StringC, t.BrandC<t.StringC, EthAddressBrand>]>;
        }>, t.PartialC<{
            royalties: t.ArrayC<t.TypeC<{
                recipient: t.BrandC<t.StringC, EthAddressBrand>;
                percentage: t.NumberC;
            }>>;
        }>]>;
    }>>;
    nonce: t.BrandC<t.BrandC<t.StringC, NumberStringBrand>, PositiveIntegerStringBrand>;
    authSignature: t.StringC;
}>;
export declare type MintBody = t.TypeOf<typeof MintBodyCodec>;
export declare const MintUserCodec: t.TypeC<{
    etherKey: t.BrandC<t.StringC, EthAddressBrand>;
    tokens: t.ArrayC<t.IntersectionC<[t.TypeC<{
        id: t.StringC;
        blueprint: t.StringC;
    }>, t.PartialC<{
        royalties: t.ArrayC<t.TypeC<{
            recipient: t.BrandC<t.StringC, EthAddressBrand>;
            percentage: t.NumberC;
        }>>;
    }>]>>;
}>;
export declare const MintV2BodyCodec: t.IntersectionC<[t.TypeC<{
    users: t.ArrayC<t.TypeC<{
        etherKey: t.BrandC<t.StringC, EthAddressBrand>;
        tokens: t.ArrayC<t.IntersectionC<[t.TypeC<{
            id: t.StringC;
            blueprint: t.StringC;
        }>, t.PartialC<{
            royalties: t.ArrayC<t.TypeC<{
                recipient: t.BrandC<t.StringC, EthAddressBrand>;
                percentage: t.NumberC;
            }>>;
        }>]>>;
    }>>;
    contractAddress: t.BrandC<t.StringC, EthAddressBrand>;
}>, t.PartialC<{
    royalties: t.ArrayC<t.TypeC<{
        recipient: t.BrandC<t.StringC, EthAddressBrand>;
        percentage: t.NumberC;
    }>>;
}>]>;
export declare type MintV2Body = t.TypeOf<typeof MintV2BodyCodec>;
export declare const BigNumberCodec: t.TypeC<{
    vaultId: t.BrandC<t.NumberC, t.IntBrand>;
    token: t.UnionC<[t.TypeC<{
        type: t.Type<ETHTokenType, ETHTokenType, unknown>;
        data: t.TypeC<{
            decimals: t.NumberC;
        }>;
    }>, t.TypeC<{
        type: t.Type<ERC20TokenType, ERC20TokenType, unknown>;
        data: t.TypeC<{
            symbol: t.StringC;
            decimals: t.NumberC;
            tokenAddress: t.BrandC<t.StringC, EthAddressBrand>;
        }>;
    }>, t.TypeC<{
        type: t.Type<ERC721TokenType, ERC721TokenType, unknown>;
        data: t.TypeC<{
            tokenId: t.StringC;
            tokenAddress: t.BrandC<t.StringC, EthAddressBrand>;
        }>;
    }>, t.TypeC<{
        type: t.Type<MintableERC20TokenType, MintableERC20TokenType, unknown>;
        data: t.TypeC<{
            id: t.StringC;
            blueprint: t.StringC;
            tokenAddress: t.UnionC<[t.StringC, t.BrandC<t.StringC, EthAddressBrand>]>;
        }>;
    }>, t.TypeC<{
        type: t.Type<MintableERC721TokenType, MintableERC721TokenType, unknown>;
        data: t.IntersectionC<[t.TypeC<{
            id: t.StringC;
            blueprint: t.StringC;
            tokenAddress: t.UnionC<[t.StringC, t.BrandC<t.StringC, EthAddressBrand>]>;
        }>, t.PartialC<{
            royalties: t.ArrayC<t.TypeC<{
                recipient: t.BrandC<t.StringC, EthAddressBrand>;
                percentage: t.NumberC;
            }>>;
        }>]>;
    }>]>;
    quantity: t.BigIntC;
}>;
export declare const BigNumberT: t.Type<BigNumber, BigNumber, unknown>;
export declare type BigNumberT = t.TypeOf<typeof BigNumberT>;
export interface PositiveBigNumberBrand {
    readonly PositiveBigNumber: unique symbol;
}
export declare const PositiveBigNumber: t.BrandC<t.Type<BigNumber, BigNumber, unknown>, PositiveBigNumberBrand>;
export declare type PositiveBigNumber = t.TypeOf<typeof PositiveBigNumber>;
export interface NonNegativeBigNumberBrand {
    readonly NonNegativeBigNumber: unique symbol;
}
export declare const NonNegativeBigNumber: t.BrandC<t.Type<BigNumber, BigNumber, unknown>, NonNegativeBigNumberBrand>;
export declare type NonNegativeBigNumber = t.TypeOf<typeof NonNegativeBigNumber>;
export declare const TransferParamsCodec: t.TypeC<{
    starkPublicKey: t.BrandC<t.StringC, HexadecimalStringBrand>;
    vaultId: t.BrandC<t.NumberC, t.IntBrand>;
}>;
export declare type TransferParams = t.TypeOf<typeof TransferParamsCodec>;
export declare const OrderParamsCodec: t.TypeC<{
    vaultId: t.BrandC<t.NumberC, t.IntBrand>;
    token: t.UnionC<[t.TypeC<{
        type: t.Type<ETHTokenType, ETHTokenType, unknown>;
        data: t.TypeC<{
            decimals: t.NumberC;
        }>;
    }>, t.TypeC<{
        type: t.Type<ERC20TokenType, ERC20TokenType, unknown>;
        data: t.TypeC<{
            symbol: t.StringC;
            decimals: t.NumberC;
            tokenAddress: t.BrandC<t.StringC, EthAddressBrand>;
        }>;
    }>, t.TypeC<{
        type: t.Type<ERC721TokenType, ERC721TokenType, unknown>;
        data: t.TypeC<{
            tokenId: t.StringC;
            tokenAddress: t.BrandC<t.StringC, EthAddressBrand>;
        }>;
    }>, t.TypeC<{
        type: t.Type<MintableERC20TokenType, MintableERC20TokenType, unknown>;
        data: t.TypeC<{
            id: t.StringC;
            blueprint: t.StringC;
            tokenAddress: t.UnionC<[t.StringC, t.BrandC<t.StringC, EthAddressBrand>]>;
        }>;
    }>, t.TypeC<{
        type: t.Type<MintableERC721TokenType, MintableERC721TokenType, unknown>;
        data: t.IntersectionC<[t.TypeC<{
            id: t.StringC;
            blueprint: t.StringC;
            tokenAddress: t.UnionC<[t.StringC, t.BrandC<t.StringC, EthAddressBrand>]>;
        }>, t.PartialC<{
            royalties: t.ArrayC<t.TypeC<{
                recipient: t.BrandC<t.StringC, EthAddressBrand>;
                percentage: t.NumberC;
            }>>;
        }>]>;
    }>]>;
    quantity: t.BrandC<t.Type<BigNumber, BigNumber, unknown>, PositiveBigNumberBrand>;
}>;
export declare type OrderParams = t.TypeOf<typeof OrderParamsCodec>;
export declare const FeeParamsCodec: t.TypeC<{
    feeToken: t.StringC;
    feeVaultId: t.BrandC<t.NumberC, t.IntBrand>;
    feeLimit: t.BrandC<t.Type<BigNumber, BigNumber, unknown>, PositiveBigNumberBrand>;
}>;
export declare type FeeParams = t.TypeOf<typeof FeeParamsCodec>;
