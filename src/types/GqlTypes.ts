export type GroceryGqlType = {
    id: number,
    name: string,
    cost: number,
};

export type OrderGqlType = {
    id: number,
    status: string,
    items: GroceryGqlType[],
}