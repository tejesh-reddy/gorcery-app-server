import { orderItemsAccess } from "../data";
import { GroceryType } from "../types/DomainTypes";


export function getOrderItems(orderId: number) {
    return orderItemsAccess.getByOrderId(orderId);
}