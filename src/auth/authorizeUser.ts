import { AuthenticationError } from "apollo-server-express"

export const authorizeUser = (user: any) => {
    if(!user) {
        throw new AuthenticationError("Must be logged in");
    }

    return user;
}