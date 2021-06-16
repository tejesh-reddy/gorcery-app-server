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