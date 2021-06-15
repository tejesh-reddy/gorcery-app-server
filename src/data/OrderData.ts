import { Groceries as groceries, Grocery } from "./GroceryData";

export type Order = {
    id: number,
    items: Grocery[],
    user: string,
};

export const Orders:Order[] = [
    {
        id: 0,
        items: [...groceries],
        user: "xyz"
    },
    {
        id: 1,
        items: [groceries[0], groceries[1]],
        user: "xyz"
    },
    {
        id: 2,
        items: [groceries[0], groceries[2]],
        user: "xyz"
    },
    {
        id: 3,
        items: [groceries[1]],
        user: "xyz"
    },
    
] 