export type GroceryGqlType = {
    id: number,
    name: string,
    cost: number,
    category_id: number,
};

export type OrderGqlType = {
    id: number,
    status: string,
    items: GroceryGqlType[],
}

export type CategoryGqlType = {
    id: number,
    name: string,
    groceries: GroceryGqlType[],
}