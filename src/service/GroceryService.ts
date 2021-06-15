import { GroceryType } from "../data/accessHelpers/GroceryData";
import getFromObjectArray from "../helpers/getFromArray";

const Groceries:any[] = []
export function getGroceryByName(
    name: string
) : GroceryType {
    return getFromObjectArray(Groceries, 'name', name);
}

export function getAllGroceries() : GroceryType[] {
    return Groceries;
}