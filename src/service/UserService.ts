import { addressAccess, orderAccess, userAccess, userOrderAccess } from "../data";
import { toGql } from "../data/accessHelpers/UserData";
import { UserGqlType } from "../types/GqlTypes";
import { getOrderById } from "./OrderService";
import { join } from "./serviceHelpers";


async function attachAddress(user: any) {
    const address:any = await addressAccess.getById(user.address_id);
    let userGql = toGql(user);
    userGql.address = {...address};

    return userGql;
}


async function attachOrders(user: UserGqlType) {
    const result = await join(user, userOrderAccess, getOrderById, "user_id", "orders", "user_id");
    return result;  
}

async function attachCart(user: UserGqlType) {
    const cart:any = await orderAccess.getById(user.cart as number);
    user.cart = cart;

    return user;
}

async function attachCartToUsers(users: any[]) {
    let result = [];

    for(let user of users) {
        result.push(await attachCart(user));
    }


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
    .then(attachCartToUsers);
}

export function getUserById(id: number) {
    return userAccess.getById(id)
    .then(attachAddress)
    .then(attachOrders)
    .then(attachCart);
}

export function getUserByUsername(name: string) {
    return userAccess.getByUsername(name)
    .then(attachAddress)
    .then(attachOrders)
    .then(attachCart);
}
