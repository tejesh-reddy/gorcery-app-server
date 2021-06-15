export type GroceryGqlType = {
    id: id,
    name: string,
    cost: number,
};

export type OrderGqlType = {
    id: number,
    status: string,
    items: GroceryGqlType[],
}