import { AuthenticationError } from "apollo-server-express";
import { authorizeUser } from "../../auth/authorizeUser";
import { addUser, clearCart, getAllUsers, getUserAddress, getUserById, getUserByUsername, getUserCart, getUserOrders, saveCart, updateUserCart } from "../../service/UserService";
import { OrderTypeNew } from "../../types/DomainTypes";

export const UserQueries = `
    user: User!
    users: [User!]
    userByUsername(username: String!): User
    userById(id: Int!): User
`;

export const UserMutations = `
    signup(username: String! password: String! email: String!): User!
    logout: String
    updateCart(cart: OrderInput!): Order!
    placeOrder: Order!
    emptyCart: String!
`

export const UserQueryResolvers = {
    user: (_:unknown, args: any, context: any) => authorizeUser(context.getUser()).then(user => getUserById(user.id)),
    users: () => getAllUsers(),
    userByUsername: (_:unknown, {username} : {username: string}) => getUserByUsername(username),
    userById: (_:unknown, {id}: {id: number}) => getUserById(id)
}

export const UserMutationResolvers = {
    signup: (_:unknown, {username, password, email} : {username: string, password: string, email: string}) => addUser(username, password, email),
    logout: (_:unknown, args: any, context: any) => context.logout(),
    updateCart: (_:unknown, { cart }:{cart: any}, context: any) => authorizeUser(context.getUser()).then(user => updateUserCart(user, cart)),
    placeOrder: (_:unknown, args: any, context: any) => authorizeUser(context.getUser()).then(saveCart),
    emptyCart: (_:unknown, args: any, context: any) => authorizeUser(context.getUser()).then(clearCart).then(()=> "done"),
}

export const UserTypeResolvers = {
   
    User: {
        address: (parent: any) => getUserAddress(parent),
        orders: (parent: any) => getUserOrders(parent),
        cart: (parent: any) =>  getUserCart(parent),
    }
}