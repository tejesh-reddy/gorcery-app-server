import { authorizeUser } from "../../../auth/authorizeUser";
import { getAllUsers, getUserById } from "../../../service/UserService";

export const UserQueries = `
    user: User!
    users: [User!]
    userById(id: Int!): User
`;


export const UserQueryResolvers = {
    user: (_:unknown, args: any, context: any) => authorizeUser(context.getUser).then(user => getUserById(user.id)),
    users: () => getAllUsers(),
}