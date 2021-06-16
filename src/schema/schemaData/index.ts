import { UserQuery } from './userQuery';
import { GroceryQueries, GroceryResolvers } from './grocery';
import { OrderQueries, OrderResolvers } from './order';
import { CategoryQueries, CategoryResolvers } from './category';

export const Queries = {
    UserQuery,
    GroceryQueries,
    OrderQueries,
    CategoryQueries
}

export const Resolvers = {
    ...OrderResolvers,
    ...GroceryResolvers,
    ...CategoryResolvers
}