import { encryptPassword } from "../auth/password";
import { addressAccess, orderAccess, userAccess, userOrderAccess } from "../data";
import { getUserObject, toGql } from "../data/accessHelpers/UserData";
import { UserType, UserTypeNew } from "../types/DomainTypes";
import { OrderGqlType, UserGqlType } from "../types/GqlTypes";
import { createOrder, getOrderById, updateOrder } from "./OrderService";
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

export async function addUser(username: string, password: string, email: string) {
    let user = getUserObject(username, email);
    user.passwordHash = await encryptPassword(password);
    const result = await userAccess.insertOne(user);
    return {id: result};
}

export async function createCart(user: UserType, cart: any) {
    const order = await createOrder("cart", cart.items);

    user.cart_id = order.id;
    userAccess.updateCart(user.id, user.cart_id);
    return order;
}


export async function updateUserCart(user: UserType, cart: any) {

    if(user.cart_id == null){
        return createCart(user, cart);
    }
    
    let new_order = await updateOrder(user.cart_id, cart.items);


    return new_order;
}