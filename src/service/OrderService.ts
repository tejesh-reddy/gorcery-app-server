import { Order, Orders } from "../data"
import getFromObjectArray from "../helpers/getFromArray"

export function getOrderById(
    id: number
    ):Order{
    return getFromObjectArray(Orders, 'id', id);
}

export function getAllOrders() : Order[] {
    console.log(Orders);
    return Orders;
}