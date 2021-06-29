import { UserType, UserTypeNew } from "../../types/DomainTypes";
import { UserGqlType } from "../../types/GqlTypes";

export const toUser = (data: any) :UserType => {

    if(data === undefined) {
        return {
            id: null,
            username: null,
            email_id: null,
            cart_id: null,
        };
    }


    let user:UserType = {
        id: data.id,
        username: data.username,
        email_id: data.email_id,
        cart_id: data.cart_id,
    }
    return user;
}

export const toUserArray = (data: any[]) : UserType[] => {
    let result:UserType[] = []
    for(let user of data){
        result.push(toUser(user));
    }

    return result;
}

export const toGql = (data: UserType): UserGqlType => {
    let UserGqlObject:UserGqlType = {...data, orders: [], cart: data.cart_id};

    return UserGqlObject;
}

export const getUserObject = (googleId: number, username: string, email_id: string) : UserType => {
    return {
        id: googleId,
        username: username,
        email_id: email_id,
        cart_id: null,
    }
}