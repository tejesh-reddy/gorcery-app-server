import { addressAccess, orderAccess, userAccess } from "../data";
import { toGql } from "../data/accessHelpers/UserData";
import { join } from "./serviceHelpers";


async function attachAddress(user: any) {
    let address:any = await addressAccess.getById(user.address_id);
    let userGql = toGql(user);
    userGql.address = {...address};

    return userGql;
}

async function attachOrders(user: any) {
    let result = join(user, orderAccess, "user_id", "orders", "user_id");
    return result;  
}

async function attachAddressToUsers(users: any[]) {
    let result = [];

    for(let user of users) {
        result.push(await attachAddress(user));
    }

    return result;
}

async function attachOrdersToUsers(users: any[]) {
    let result = [];

    for(let user of users) {
        result.push(await attachOrders(user));
    }

    return result;
}

export function getAllUsers() {
    return userAccess.getAll()
    .then(attachAddressToUsers)
    .then(attachOrdersToUsers)
}

export function getUserById(id: number) {
    return userAccess.getById(id)
    .then(attachAddress)
    .then(attachOrders);
}

export function getUserByUsername(name: string) {
    return userAccess.getByUsername(name)
    .then(attachAddress)
    .then(attachOrders);
}