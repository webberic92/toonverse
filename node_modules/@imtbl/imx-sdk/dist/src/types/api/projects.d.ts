import * as t from 'io-ts';
export declare const CreateProjectParamsCodec: t.TypeC<{
    name: t.StringC;
    company_name: t.StringC;
    contact_email: t.StringC;
}>;
export declare type CreateProjectParamsF = t.TypeOf<typeof CreateProjectParamsCodec>;
export declare type CreateProjectParams = t.OutputOf<typeof CreateProjectParamsCodec>;
export declare const GetProjectParamsCodec: t.TypeC<{
    project_id: t.NumberC;
}>;
export declare type GetProjectParamsF = t.TypeOf<typeof GetProjectParamsCodec>;
export declare type GetProjectParams = t.OutputOf<typeof GetProjectParamsCodec>;
export declare const CreateProjectResultsCodec: t.TypeC<{
    id: t.NumberC;
}>;
export declare type CreateProjectResultF = t.TypeOf<typeof CreateProjectResultsCodec>;
export declare type CreateProjectResult = t.OutputOf<typeof CreateProjectResultsCodec>;
export declare const ProjectResultCodec: t.TypeC<{
    id: t.NumberC;
    name: t.StringC;
    company_name: t.StringC;
    contact_email: t.StringC;
    mint_remaining: t.NumberC;
    mint_limit_expires_at: t.UnionC<[t.NullC, t.StringC]>;
    mint_monthly_limit: t.NumberC;
    collection_remaining: t.NumberC;
    collection_limit_expires_at: t.UnionC<[t.NullC, t.StringC]>;
    collection_monthly_limit: t.NumberC;
}>;
export declare type ProjectResultF = t.TypeOf<typeof ProjectResultCodec>;
export declare type ProjectResult = t.OutputOf<typeof ProjectResultCodec>;
export declare const ProjectsResultCodec: t.IntersectionC<[t.TypeC<{
    result: t.ArrayC<t.TypeC<{
        id: t.NumberC;
        name: t.StringC;
        company_name: t.StringC;
        contact_email: t.StringC;
        mint_remaining: t.NumberC;
        mint_limit_expires_at: t.UnionC<[t.NullC, t.StringC]>;
        mint_monthly_limit: t.NumberC;
        collection_remaining: t.NumberC;
        collection_limit_expires_at: t.UnionC<[t.NullC, t.StringC]>;
        collection_monthly_limit: t.NumberC;
    }>>;
}>, t.IntersectionC<[t.TypeC<{
    cursor: t.StringC;
}>, t.PartialC<{
    remaining: t.BrandC<t.NumberC, t.IntBrand>;
}>]>]>;
export declare type ProjectsResultF = t.TypeOf<typeof ProjectsResultCodec>;
export declare type ProjectsResult = t.OutputOf<typeof ProjectsResultCodec>;
