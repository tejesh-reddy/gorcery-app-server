import { encryptPassword } from "../auth/password";
import { addressAccess, orderAccess, userAccess, userOrderAccess } from "../data";
import { getUserObject, toGql } from "../data/accessHelpers/UserData";
import { UserOrderType, UserType, UserTypeNew } from "../types/DomainTypes";
import { OrderGqlType, UserGqlType } from "../types/GqlTypes";
import { addOrderToUser, createOrder, getOrderById, updateOrder, updateOrderStatus } from "./OrderService";
import { join } from "./serviceHelpers";


export async function getUserAddress(user: any) {
    const address:any = await addressAccess.getById(user.address_id);
    
    return {...address}
}



export async function getUserOrders(user:any) {
    const result = await join(toGql(user), userOrderAccess, getOrderById, "user_id", "orders", "order_id");
    console.log(result.orders)
    return result.orders;  
}

export async function getUserCart(user:any) {
    const cart:any = await orderAccess.getById(user.cart_id);

    return {...cart}
}

export function getAllUsers() {
    return userAccess.getAll()
}

export function getUserById(id: number) {
    return userAccess.getById(id)
}

export function getUserByUsername(name: string) {
    return userAccess.getByUsername(name)
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

export async function clearCart(user: UserType) {
    return userAccess.emptyCart(user.id)
}

export async function saveCart(user: UserType) {
    const cart_id = user.cart_id;
    await updateOrderStatus(cart_id, "placed");
    let result = await addOrderToUser(user.id, cart_id);

    await userAccess.emptyCart(user.id);

    return result;
}