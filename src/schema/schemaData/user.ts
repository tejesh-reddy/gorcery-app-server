import { getAllUsers, getUserById, getUserByUsername } from "../../service/UserService";

export const UserQueries = `
    me: String!
    users: [User!]
    userByUsername(username: String!): User
    userById(id: Int!): User
`;

export const UserQueryResolvers = {
    me: () => "should be currently logged in",
    users: () => getAllUsers(),
    userByUsername: (_:unknown, {username} : {username: string}) => getUserByUsername(username),
    userById: (_:unknown, {id}: {id: number}) => getUserById(id)
}
