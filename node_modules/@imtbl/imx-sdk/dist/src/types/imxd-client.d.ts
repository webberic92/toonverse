import * as t from 'io-ts';
export declare namespace IMXDClientMethodParams {
    const GetDailyPointsBalanceParamsCodec: t.TypeC<{
        starkPublicKey: t.BrandC<t.StringC, import("./runtime").HexadecimalStringBrand>;
        date: t.StringC;
    }>;
    type GetDailyPointsBalanceParams = t.TypeOf<typeof GetDailyPointsBalanceParamsCodec>;
    type GetDailyPointsBalanceParamsTS = t.OutputOf<typeof GetDailyPointsBalanceParamsCodec>;
}
export declare namespace IMXDClientMethodResults {
    const GetDailyPointsBalanceResultCodec: t.TypeC<{
        daily_points_balance: t.StringC;
        date: t.StringC;
        starkKey: t.BrandC<t.StringC, import("./runtime").HexadecimalStringBrand>;
    }>;
    type GetDailyPointsBalanceResult = t.TypeOf<typeof GetDailyPointsBalanceResultCodec>;
    type GetDailyPointsBalanceResultTS = t.OutputOf<typeof GetDailyPointsBalanceResultCodec>;
}
