import * as t from 'io-ts';
export declare const CreateCollectionParamsCodec: t.IntersectionC<[t.TypeC<{
    name: t.StringC;
    contract_address: t.StringC;
    owner_public_key: t.StringC;
    project_id: t.NumberC;
}>, t.PartialC<{
    metadata_api_url: t.StringC;
    description: t.StringC;
    icon_url: t.StringC;
    collection_image_url: t.StringC;
}>]>;
export declare type CreateCollectionParamsF = t.TypeOf<typeof CreateCollectionParamsCodec>;
export declare type CreateCollectionParams = t.OutputOf<typeof CreateCollectionParamsCodec>;
export declare const CreateCollectionsResultsCodec: t.TypeC<{
    name: t.StringC;
    address: t.StringC;
    project_id: t.NumberC;
    metadata_api_url: t.UnionC<[t.NullC, t.StringC]>;
    description: t.UnionC<[t.NullC, t.StringC]>;
    icon_url: t.UnionC<[t.NullC, t.StringC]>;
    collection_image_url: t.UnionC<[t.NullC, t.StringC]>;
}>;
export declare type CreateCollectionsResultF = t.TypeOf<typeof CreateCollectionsResultsCodec>;
export declare type CreateCollectionsResult = t.OutputOf<typeof CreateCollectionsResultsCodec>;
export declare const UpdateCollectionParamsCodec: t.PartialC<{
    name: t.UnionC<[t.UndefinedC, t.StringC]>;
    description: t.UnionC<[t.UndefinedC, t.StringC]>;
    icon_url: t.UnionC<[t.UndefinedC, t.StringC]>;
    metadata_api_url: t.UnionC<[t.UndefinedC, t.StringC]>;
    collection_image_url: t.UnionC<[t.UndefinedC, t.StringC]>;
}>;
export declare type UpdateCollectionParamsF = t.TypeOf<typeof UpdateCollectionParamsCodec>;
export declare type UpdateCollectionParams = t.OutputOf<typeof UpdateCollectionParamsCodec>;
export declare const UpdateCollectionsResultCodec: t.TypeC<{
    address: t.StringC;
    name: t.StringC;
    description: t.UnionC<[t.NullC, t.StringC]>;
    icon_url: t.UnionC<[t.NullC, t.StringC]>;
    collection_image_url: t.UnionC<[t.NullC, t.StringC]>;
    project_id: t.NumberC;
    metadata_api_url: t.UnionC<[t.NullC, t.StringC]>;
}>;
export declare type UpdateCollectionsResultF = t.TypeOf<typeof UpdateCollectionsResultCodec>;
export declare type UpdateCollectionsResults = t.OutputOf<typeof UpdateCollectionsResultCodec>;
