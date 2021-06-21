import { groceryAccess, orderItemsAccess } from "../data";
import { getFromObjectArray } from "../helpers/getFromArray";
import { getOrderById } from "./OrderService";



export async function getItemWithQuantity(orderId: number, groceryId: number) {
    let grocery:any = await groceryAccess.getById(groceryId);
    let orders:any = await orderItemsAccess.getByField("order_id", orderId);

    let quantity:any = getFromObjectArray<any>(orders, "grocery_id", groceryId).quantity;

    return {
        grocery,
        quantity
    }
}

export async function deleteOrderItems(order_id: number){
    const res = await orderItemsAccess.removeOrder(order_id);

    const orderItems =  await orderItemsAccess.getAll();
    return res;
}

export async function addOrderItems(order_id: number, items: any[]){
    const promises:Promise<any>[] = []
    items.forEach(async (item: any) => {
        const itemFormat = {
            order_id: order_id,
            grocery_id: item.grocery_id,
            quantity: item.quantity,
        };

        await orderItemsAccess.insertOne(itemFormat);
    })
    await Promise.all(promises);
}