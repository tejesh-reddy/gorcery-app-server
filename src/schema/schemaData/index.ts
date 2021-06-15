import { UserQuery } from './userQuery';
import { GroceryQueries, GroceryResolvers } from './grocery';
import { OrderQueries, OrderResolvers } from './order';

export const Queries = {
    UserQuery,
    GroceryQueries,
    OrderQueries,
}

export const Resolvers = {
    ...OrderResolvers,
    ...GroceryResolvers,
}