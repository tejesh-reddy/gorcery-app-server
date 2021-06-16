import { addressAccess, userAccess } from "../data";
import { toGql } from "../data/accessHelpers/UserData";
import { AddressType } from "../types/DomainTypes";


async function attachAddress(user: any) {
    let address:any = await addressAccess.getById(user.address_id);
    let userGql = toGql(user);
    userGql.address = address;

    return userGql;
}

async function attachAddressToUsers(users: any[]) {
    let result = [];

    for(let user of users) {
        result.push(await attachAddress(user));
    }

    return result;
}

export function getAllUsers() {
    return userAccess.getAll().then(attachAddressToUsers)
}

export function getUserById(id: number) {
    return userAccess.getById(id).then(attachAddress);
}

export function getUserByUsername(name: string) {
    return userAccess.getByUsername(name).then(attachAddress)
}