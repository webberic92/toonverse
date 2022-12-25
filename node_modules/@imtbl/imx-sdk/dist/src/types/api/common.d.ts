import * as t from 'io-ts';
export declare const ApiResponseCodec: t.TypeC<{
    result: t.StringC;
}>;
export declare type ApiResponseF = t.TypeOf<typeof ApiResponseCodec>;
export declare type ApiResponse = t.OutputOf<typeof ApiResponseCodec>;
