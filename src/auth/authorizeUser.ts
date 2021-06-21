import { AuthenticationError } from "apollo-server-express"

export async function authorizeUser(user: any) {
    if(!user) {
        throw new AuthenticationError("Must be logged in");
    }

    return user;
}