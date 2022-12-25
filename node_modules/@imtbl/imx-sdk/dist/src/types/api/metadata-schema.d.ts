import * as t from 'io-ts';
import { ApiResponseCodec } from './common';
export declare enum MetadataTypes {
    Enum = "enum",
    Text = "text",
    Boolean = "boolean",
    Continuous = "continuous",
    Discrete = "discrete"
}
export declare const MetadataTypesT: t.Type<MetadataTypes, MetadataTypes, unknown>;
export declare const MetadataPropertyCodec: t.TypeC<{
    name: t.StringC;
    type: t.Type<MetadataTypes, MetadataTypes, unknown>;
    filterable: t.BooleanC;
}>;
export declare const MetadataObjectCodec: t.IntersectionC<[t.TypeC<{
    name: t.StringC;
}>, t.PartialC<{
    type: t.UnionC<[t.UndefinedC, t.Type<MetadataTypes, MetadataTypes, unknown>]>;
    filterable: t.UnionC<[t.UndefinedC, t.BooleanC]>;
}>]>;
export declare const AddMetadataSchemaToCollectionParamsCodec: t.TypeC<{
    metadata: t.ArrayC<t.IntersectionC<[t.TypeC<{
        name: t.StringC;
    }>, t.PartialC<{
        type: t.UnionC<[t.UndefinedC, t.Type<MetadataTypes, MetadataTypes, unknown>]>;
        filterable: t.UnionC<[t.UndefinedC, t.BooleanC]>;
    }>]>>;
}>;
export declare type AddMetadataSchemaToCollectionParamsF = t.TypeOf<typeof AddMetadataSchemaToCollectionParamsCodec>;
export declare type AddMetadataSchemaToCollectionParams = t.OutputOf<typeof AddMetadataSchemaToCollectionParamsCodec>;
export declare const AddMetadataSchemaToCollectionResultCodec: t.TypeC<{
    result: t.StringC;
}>;
export declare type AddMetadataSchemaToCollectionResultF = t.TypeOf<typeof ApiResponseCodec>;
export declare type AddMetadataSchemaToCollectionResult = t.OutputOf<typeof ApiResponseCodec>;
export declare const UpdateMetadataSchemaByNameParamsCodec: t.PartialC<{
    name: t.UnionC<[t.UndefinedC, t.StringC]>;
    type: t.UnionC<[t.UndefinedC, t.Type<MetadataTypes, MetadataTypes, unknown>]>;
    filterable: t.UnionC<[t.UndefinedC, t.BooleanC]>;
}>;
export declare type UpdateMetadataSchemaByNameParamsF = t.TypeOf<typeof UpdateMetadataSchemaByNameParamsCodec>;
export declare type UpdateMetadataSchemaByNameParams = t.OutputOf<typeof UpdateMetadataSchemaByNameParamsCodec>;
export declare const UpdateMetadataSchemaByNameResultCodec: t.TypeC<{
    result: t.StringC;
}>;
export declare type UpdateMetadataSchemaByNameResultF = t.TypeOf<typeof ApiResponseCodec>;
export declare type UpdateMetadataSchemaByNameResult = t.OutputOf<typeof ApiResponseCodec>;
export declare const GetMetadataSchemaParamsCodec: t.TypeC<{
    address: t.BrandC<t.StringC, import("../runtime").HexadecimalStringBrand>;
}>;
export declare type GetMetadataSchemaParamsF = t.TypeOf<typeof GetMetadataSchemaParamsCodec>;
export declare type GetMetadataSchemaParams = t.OutputOf<typeof GetMetadataSchemaParamsCodec>;
export declare const GetMetadataSchemaResultCodec: t.ArrayC<t.IntersectionC<[t.TypeC<{
    name: t.StringC;
}>, t.PartialC<{
    type: t.UnionC<[t.UndefinedC, t.Type<MetadataTypes, MetadataTypes, unknown>]>;
    filterable: t.UnionC<[t.UndefinedC, t.BooleanC]>;
}>]>>;
export declare type GetMetadataSchemaResultF = t.TypeOf<typeof GetMetadataSchemaResultCodec>;
export declare type GetMetadataSchemaResult = t.OutputOf<typeof GetMetadataSchemaResultCodec>;
