import { categoryAccess, groceryAccess } from "../data";
import { toGql } from "../data/accessHelpers/CategoryData";
import { getGroceryById } from "./GroceryService";
import { join } from "./serviceHelpers";

export async function addGroceries(category: any) {
    let result = await join(category, groceryAccess, "category_id", "groceries", "category_id", toGql);

    return result;
}

export function getAllCategories() {
    return categoryAccess.getAll();
}

export function getCategoryById(id: number) {
    return categoryAccess.getById(id);
}