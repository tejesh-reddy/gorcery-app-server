import { GroceryType, GroceryTypeNew } from "../../types/DomainTypes";
import { GroceryGqlType } from "../../types/GqlTypes";

export const toGrocery = (data: any) => {
    let grocery:GroceryType = {
        id: data.id,
        name: data.name,
        cost: data.cost,
        unit: data.unit,
        image: data.url,
    }

    return grocery;
}

export const toGroceryArray = (data: any[]) => {
    let result:GroceryType[] = []
    for(let grocery of data){
        result.push(toGrocery(grocery));
    }

    return result;
}

export const toGql = (data: GroceryType):GroceryGqlType => {
    let GroceryGqlObject:GroceryGqlType = {...data};

    return GroceryGqlObject;
}

export const fromGql = (data: GroceryGqlType):GroceryTypeNew => {

    let newGrocery : GroceryTypeNew = {...data}

    return newGrocery;

}