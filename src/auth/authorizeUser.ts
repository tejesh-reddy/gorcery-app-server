import { AuthenticationError } from "apollo-server-express"

export async function authorizeUser(userPromise: any) {
    let user = await userPromise()
    if(!user) {
        throw new AuthenticationError("Must be logged in");
    }

    return user;
}