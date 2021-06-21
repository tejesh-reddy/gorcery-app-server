import { groceryAccess, orderAccess, orderItemsAccess } from "../data";
import { toGql } from "../data/accessHelpers/GroceryData";
import { OrderType, OrderTypeNew } from "../types/DomainTypes";
import { OrderGqlType } from "../types/GqlTypes";
import { getGroceryById } from "./GroceryService";
import { addOrderItems, deleteOrderItems, getItemWithQuantity } from "./orderItemsService";
import { join } from "./serviceHelpers";

const Orders:any[] = [];

async function attachItems(order:any) {
    let orderGql = toGql(order);
    let result = join(orderGql, orderItemsAccess, (groceryId: number) => getItemWithQuantity(orderGql.id, groceryId), "order_id", "items", "grocery_id");

    
    return result;     
}

async function attachItemsToOrders(orderArray: unknown[]) {
    let result = [];
    for(let order of orderArray) {
        result.push(await attachItems(order));
    }

    return result;
}

export function getOrderById(id: number){
    return orderAccess.getById(id).then(attachItems);
}

export function getAllOrders(){
    return orderAccess.getAll().then(attachItemsToOrders);
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