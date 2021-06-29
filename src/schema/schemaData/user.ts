import { AuthenticationError } from "apollo-server-express";
import { authorizeUser } from "../../auth/authorizeUser";
import { addUser, clearCart, getAllUsers, getUserById, getUserCart, getUserOrders, saveCart, updateUserCart } from "../../service/UserService";
import { OrderTypeNew } from "../../types/DomainTypes";

export const UserQueries = `
    user: User!
    users: [User!]
    userById(id: Int!): User
`;

export const UserMutations = `
    logout: String
    updateCart(cart: OrderInput!): Order!
    placeOrder: Order!
    emptyCart: String!
`

export const UserQueryResolvers = {
    user: (_:unknown, args: any, context: any) => authorizeUser(context.getUser()).then(user => getUserById(user.id)),
    users: () => getAllUsers(),
    userById: (_:unknown, {id}: {id: number}) => getUserById(id)
}

export const UserMutationResolvers = {
    logout: (_:unknown, args: any, context: any) => context.logout(),
    updateCart: (_:unknown, { cart }:{cart: any}, context: any) => authorizeUser(context.getUser()).then(user => updateUserCart(user, cart)),
    placeOrder: (_:unknown, args: any, context: any) => authorizeUser(context.getUser()).then(saveCart),
    emptyCart: (_:unknown, args: any, context: any) => authorizeUser(context.getUser()).then(clearCart).then(()=> "done"),
}

export const UserTypeResolvers = {
   
    User: {
        orders: (parent: any) => getUserOrders(parent),
        cart: (parent: any) =>  getUserCart(parent),
    }
}