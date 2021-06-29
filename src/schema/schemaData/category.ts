import { getAllCategories, getCategoryById, getGroceries } from "../../service/CategoryService";

export const CategoryQueries = `
    categories: [Category!]
    categoryById(id: Int!): Category!
`;

export const CategoryQueryResolvers = {
    categories: () => getAllCategories(),
    categoryById: (_:unknown, {id}: {id: number}) => getCategoryById(id),
}

export const CategoryTypeResolvers = {
    Category: {
        groceries: (parent:any) => getGroceries(parent)
    }
}