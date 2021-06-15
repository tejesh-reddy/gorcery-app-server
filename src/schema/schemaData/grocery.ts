import { Groceries } from "../../data";
import getFromObjectArray from "../../helpers/getFromArray";
import { getAllGroceries, getGroceryByName } from "../../service/GroceryService";

export const GroceryQueries = `
    grocery(name: String!): Grocery
    groceries: [Grocery!]
`;

export const GroceryResolvers = {
    grocery: (_:unknown, { name }: {name: string}) => getGroceryByName(name),
    groceries: () => getAllGroceries(),
}