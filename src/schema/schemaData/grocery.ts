import {getFromObjectArray} from "../../helpers/getFromArray";
import { getAllGroceries, getGroceryById, getGroceryByName } from "../../service/GroceryService";

//TODO: Add groceryByCategory(category: string): Grocery to schema
export const GroceryQueries = `
    grocery(name: String!): Grocery
    groceries: [Grocery!]
    groceryById(id: Int!): Grocery
    
`;

export const GroceryResolvers = {
    grocery: async function(_:unknown, { name }: {name: string}) {
        let result = {}
        await getGroceryByName(name).then(data => result=data);
        return result;
    },
    groceryById: async function(_:unknown, { id } : { id:number }) {
        let result = {};
        await getGroceryById(id).then(data=> result = data);
        return result;
    },
    groceries: () => getAllGroceries(),
}