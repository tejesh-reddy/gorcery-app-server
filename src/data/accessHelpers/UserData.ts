import { UserType } from "../../types/DomainTypes";
import { UserGqlType } from "../../types/GqlTypes";

export const toUser = (data: any) :UserType => {

    if(data === undefined) {
        return {
            id: null,
            username: null,
            email_id: null,
        };
    }

    let user:any = {
        id: data.id,
        username: data.status,
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
    let UserGqlObject:UserGqlType = {...data};

    return UserGqlObject;
}