import { groceryAccess } from "../data";


export async function getGroceryByName(
    name: string
) {
    return groceryAccess.getByName(name);
}

export async function getGroceryById(
    id: number
) {
    return groceryAccess.getById(id);
}

export async function getAllGroceries() {
    return groceryAccess.getAll();
}