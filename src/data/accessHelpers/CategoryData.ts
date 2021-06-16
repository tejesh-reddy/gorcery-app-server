import { CategoryGqlType } from "../../types/GqlTypes";

export type CategoryType = {
    id: number,
    name: string,
}

export function toCategory(data: any) : CategoryType {
    let category : CategoryType = {...data};

    return category;
}

export function toCategoryArray(data: any) : CategoryType[] {
    data.map(toCategory);

    return data;
}

export function toGql(data: CategoryType) : CategoryGqlType {
    let result : CategoryGqlType = {...data, groceries:[]};

    return result;

}