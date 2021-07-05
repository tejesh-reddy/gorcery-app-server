import { getAllGroceries, getGroceryById, getGroceryByName } from "../../../service/GroceryService";

export const GroceryQueries = `
    grocery(name: String!): Grocery
    groceries: [Grocery!]
    groceryById(id: Int!): Grocery
`;

export const GroceryQueryResolvers = {
    grocery:  (_:unknown, { name }: {name: string}) => getGroceryByName(name),
    groceryById: (_:unknown, { id } : { id:number })=> getGroceryById(id),

    groceries: () => getAllGroceries(),

}