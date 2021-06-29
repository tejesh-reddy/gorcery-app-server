import { addressAccess, groceryAccess, orderAccess, orderItemsAccess, userOrderAccess } from "../data";
import { toGql } from "../data/accessHelpers/GroceryData";
import { OrderType, OrderTypeNew } from "../types/DomainTypes";
import { AddressGqlType, OrderGqlType } from "../types/GqlTypes";
import { getGroceryById } from "./GroceryService";
import { addOrderItems, deleteOrderItems, getItemWithQuantity } from "./orderItemsService";
import { join } from "./serviceHelpers";

export async function getOrderAddress(order: any) {
    const address:any = await addressAccess.getById(order.address_id);
    
    return {...address}
}


export async function getOrderItems(order:any) {
    let orderGql = toGql(order);
    let result = await join(orderGql, orderItemsAccess, (groceryId: number) => getItemWithQuantity(orderGql.id, groceryId), "order_id", "items", "grocery_id");


    
    return result.items;     
}

export function getOrderById(id: number){
    return orderAccess.getById(id);
}

export function getAllOrders(){
    return orderAccess.getAll();
}

export async function updateOrderAddress(order_id:number, address: AddressGqlType) {
    const address_id = await addressAccess.insertOne(address)
    await orderAccess.updateAddress(order_id, address_id)
    return getOrderById(order_id)
}

export async function updateOrder(order_id: number, items: any[]) {
    await deleteOrderItems(order_id);
    await addOrderItems(order_id, items);

    return getOrderById(order_id);
}

export async function createOrder(status: string, items: any[]) {
    const orderId:number = await orderAccess.insertOne({status: status});

    await addOrderItems(orderId, items);

    return getOrderById(orderId);
}

export async function updateOrderStatus(order_id: number, status: string) {
    orderAccess.updateStatus(order_id, status)
}

export async function addOrderToUser(user_id: number, order_id: number) {
    const userOrder = {
        user_id, 
        order_id
    }
    await userOrderAccess.insertOne(userOrder);
    return getOrderById(order_id);
}