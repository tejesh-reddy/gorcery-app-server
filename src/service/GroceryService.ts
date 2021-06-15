import { GroceryGqlType } from "../types/GqlTypes";
import getFromObjectArray from "../helpers/getFromArray";
import { GroceryType } from "../types/DomainTypes";

const Groceries:any[] = []
export function getGroceryByName(
    name: string
) : GroceryGqlType {
    return getFromObjectArray(Groceries, 'name', name);
}

export function getAllGroceries() : GroceryType[] {
    return Groceries;
}