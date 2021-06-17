import { groceryAccess, orderItemsAccess } from "../data";
import { getFromObjectArray } from "../helpers/getFromArray";


export async function getItemWithQuantity(orderId: number, groceryId: number) {
    let grocery:any = await groceryAccess.getById(groceryId);
    let orders:any = await orderItemsAccess.getByField("order_id", orderId);

    let quantity:any = getFromObjectArray<any>(orders, "grocery_id", groceryId).quantity;

    return {
        grocery,
        quantity
    }
}