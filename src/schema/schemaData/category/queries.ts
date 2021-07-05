import { getAllCategories, getCategoryById } from "../../../service/CategoryService";

export const CategoryQueries = `
    categories: [Category!]
    categoryById(id: Int!): Category!
`;

export const CategoryQueryResolvers = {
    categories: () => getAllCategories(),
    categoryById: (_:unknown, {id}: {id: number}) => getCategoryById(id),
}