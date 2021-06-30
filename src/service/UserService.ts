import { encryptPassword } from "../auth/password";
import { addressAccess, orderAccess, userAccess, userOrderAccess } from "../data";
import { getUserObject, toGql } from "../data/accessHelpers/UserData";
import { UserOrderType, UserType, UserTypeNew } from "../types/DomainTypes";
import { OrderGqlType, UserGqlType } from "../types/GqlTypes";
import { addOrderToUser, createOrder, deleteOrder, getOrderById, updateOrder, updateOrderStatus } from "./OrderService";
import { join } from "./serviceHelpers";




export async function getUserOrders(user:any) {
    const result = await join(toGql(user), userOrderAccess, getOrderById, "user_id", "orders", "order_id");
    return result.orders;  
}

export async function getUserCart(user:any) {
    const cart:any = await orderAccess.getById(user.cart_id);

    return {...cart}
}

export function getAllUsers() {
    return userAccess.getAll()
}

export function getUserById(id: string) {
    return userAccess.getById(id)
}


export async function addUser(googleId: number, username: string, email: string) {
    let user = getUserObject(googleId, username, email);
    await userAccess.insertOne(user);
    return googleId;
}

export async function createCart(user: UserType, cart: any) {
    const order:any = await createOrder("cart", cart.items);

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
    await userAccess.emptyCart(user.id)
    await deleteOrder(user.cart_id)
}

export async function saveCart(user: UserType) {
    const cart_id = user.cart_id;
    await updateOrderStatus(cart_id, "placed");
    let result = await addOrderToUser(user.id, cart_id);

    await userAccess.emptyCart(user.id);

    return result;
}