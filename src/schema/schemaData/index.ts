import { CategoryQueries, CategoryQueryResolvers } from "./category"
import { GroceryQueries, GroceryQueryResolvers } from "./grocery"
import { OrderQueries, OrderQueryResolvers } from "./order"
import { UserQueries, UserQueryResolvers, UserMutations, UserMutationResolvers } from "./user"


export const Queries = {
    GroceryQueries,
    OrderQueries,
    UserQueries,
    CategoryQueries,
}

export const QueryResolvers = {
    ...OrderQueryResolvers,
    ...GroceryQueryResolvers,
    ...UserQueryResolvers,
    ...CategoryQueryResolvers,
}

export const Mutations = {
    UserMutations,
}

export const MutationResolvers = {
    ...UserMutationResolvers,
}