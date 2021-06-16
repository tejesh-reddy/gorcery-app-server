import { UserQueries, UserResolvers } from './user';
import { GroceryQueries, GroceryResolvers } from './grocery';
import { OrderQueries, OrderResolvers } from './order';
import { CategoryQueries, CategoryResolvers } from './category';

export const Queries = {
    GroceryQueries,
    OrderQueries,
    UserQueries,
    CategoryQueries,
}

export const Resolvers = {
    ...OrderResolvers,
    ...GroceryResolvers,
    ...UserResolvers,
    ...CategoryResolvers
}