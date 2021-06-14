import { Groceries, Grocery } from "../data/GroceryData";
import getFromObjectArray from "../helpers/getFromArray";

export function getGroceryByName(
    name: string
) : Grocery {
    return getFromObjectArray(Groceries, 'name', name);
}

export function getAllGroceries() : Grocery[] {
    return Groceries;
}