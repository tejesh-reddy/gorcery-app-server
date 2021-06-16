import { categoryAccess, groceryAccess } from "../data";
import { toGql } from "../data/accessHelpers/CategoryData";
import { join } from "./serviceHelpers";

export async function addGroceries(category: any) {
    let categoryGql = toGql(category); 
    let result = await join(categoryGql, groceryAccess, "category_id", "groceries", "id");

    return result;
}


export async function addGroceriesToCategories(categories: any[]) {
    let result:any[] = [];

    for(let category of categories) {
        result.push(await addGroceries(category));
    }

    return result;
}

export function getAllCategories() {
    return categoryAccess.getAll().then(addGroceriesToCategories);
}

export function getCategoryById(id: number) {
    return categoryAccess.getById(id).then(addGroceries);
}