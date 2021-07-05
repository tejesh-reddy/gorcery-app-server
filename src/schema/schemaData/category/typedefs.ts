import { getGroceries } from "../../../service/CategoryService";

export const CategoryTypedef = `
type Category {
    id: Int!
    name: String!
    groceries: [Grocery!]!
}`;


export const CategoryTypeResolvers = {
    Category: {
        groceries: (parent:any) => getGroceries(parent)
    }
}