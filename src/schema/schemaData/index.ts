import { UserTypedef, UserTypeResolvers } from './user/typedef'
import { UserQueries, UserQueryResolvers } from './user/queries'
import { UserMutationResolvers, UserMutations } from './user/mutations'
import { CategoryQueries, CategoryQueryResolvers } from './category/queries';
import { CategoryTypeResolvers, CategoryTypedef } from './category/typedefs';
import { GroceryQueries, GroceryQueryResolvers } from './grocery/queries';
import { GroceryTypeDef } from './grocery/typedef';
import { OrderMutationResolvers, OrderMutations } from './order/mutations';
import { OrderQueries, OrderQueryResolvers } from './order/queries';
import { OrderTypeResolvers, OrderTypedef } from './order/typedef'


export const Typedefs = `
    ${UserTypedef}
    ${GroceryTypeDef}
    ${CategoryTypedef}
    ${OrderTypedef}
`

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

export const TypeResolvers = {
    ...UserTypeResolvers,    
    ...CategoryTypeResolvers,
    ...OrderTypeResolvers,

}

export const Mutations = {
    UserMutations,
    OrderMutations
}

export const MutationResolvers = {
    ...UserMutationResolvers,
    ...OrderMutationResolvers,
}