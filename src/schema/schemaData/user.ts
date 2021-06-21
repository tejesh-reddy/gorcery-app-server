import { getAllUsers, getUserById, getUserByUsername } from "../../service/UserService";

export const UserQueries = `
    user: User!
    users: [User!]
    userByUsername(username: String!): User
    userById(id: Int!): User
    logout: String
`;

export const UserQueryResolvers = {
    user: (_:unknown, args: any, context: any) => context.getUser(),
    logout: (_:unknown, args: any, context: any) => context.logout(),
    users: () => getAllUsers(),
    userByUsername: (_:unknown, {username} : {username: string}) => getUserByUsername(username),
    userById: (_:unknown, {id}: {id: number}) => getUserById(id)
}
