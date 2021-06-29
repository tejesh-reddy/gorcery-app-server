import { categoryAccess, groceryAccess } from "../data";
import { toGql } from "../data/accessHelpers/CategoryData";
import { getGroceryById } from "./GroceryService";
import { join } from "./serviceHelpers";

export async function getGroceries(category: any) {
    let categoryGql = toGql(category); 
    let result = await join(categoryGql, groceryAccess, getGroceryById, "category_id", "groceries", "id");

    return result.groceries;
}



export function getAllCategories() {
    return categoryAccess.getAll();
}

export function getCategoryById(id: number) {
    return categoryAccess.getById(id);
}