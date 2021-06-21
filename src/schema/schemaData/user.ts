import { AuthenticationError } from "apollo-server-express";
import { authorizeUser } from "../../auth/authorizeUser";
import { addUser, getAllUsers, getUserById, getUserByUsername } from "../../service/UserService";

export const UserQueries = `
    user: User!
    users: [User!]
    userByUsername(username: String!): User
    userById(id: Int!): User
`;

export const UserMutations = `
    signup(username: String! password: String! email: String!): User!
    logout: String
`

export const UserQueryResolvers = {
    user: (_:unknown, args: any, context: any) => authorizeUser(context.getUser()),
    users: () => getAllUsers(),
    userByUsername: (_:unknown, {username} : {username: string}) => getUserByUsername(username),
    userById: (_:unknown, {id}: {id: number}) => getUserById(id)
}

export const UserMutationResolvers = {
    signup: (_:unknown, {username, password, email} : {username: string, password: string, email: string}) => addUser(username, password, email),
    logout: (_:unknown, args: any, context: any) => context.logout(),
}
