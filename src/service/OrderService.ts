import { OrderType } from "../data/accessHelpers";
import getFromObjectArray from "../helpers/getFromArray"

const Orders:any[] = [];

export function getOrderById(
    id: number
    ):OrderType{
    return getFromObjectArray(Orders, 'id', id);
}

export function getAllOrders() : OrderType[] {
    console.log(Orders);
    return Orders;
}