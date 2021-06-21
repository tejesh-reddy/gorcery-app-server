import { UserType, UserTypeNew } from "../../types/DomainTypes";
import { UserGqlType } from "../../types/GqlTypes";

export const toUser = (data: any) :UserType => {

    if(data === undefined) {
        return {
            id: null,
            username: null,
            email_id: null,
            address_id: null,
            cart_id: null,
            passwordHash: null,
        };
    }

    let user:UserType = {
        id: data.id,
        username: data.username,
        email_id: data.email_id,
        address_id: data.address,
        cart_id: data.cart_id,
        passwordHash: data.password,
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
    let UserGqlObject:UserGqlType = {...data, address: data.address_id, orders: [], cart: data.cart_id};

    return UserGqlObject;
}

export const getUserObject = (username: string, email_id: string) : UserTypeNew => {
    return {
        username: username,
        passwordHash: null,
        email_id: email_id,
        address_id: null,
        cart_id: null,
    }
}