import { orderAccess, orderItemsAccess } from "../data";
import { toGql } from "../data/accessHelpers/GroceryData";
import { OrderType } from "../types/DomainTypes";
import { OrderGqlType } from "../types/GqlTypes";
import { getGroceryById } from "./GroceryService";
import { join } from "./serviceHelpers";

const Orders:any[] = [];

async function attachItems(order:unknown) {
    let result = join(order, orderAccess, orderItemsAccess, "order_id", "items", "grocery_id", toGql);
    return result.then(async function (result: any) {
        for(let i = 0; i < result.items.length; i++) {
            result.items[i] = await getGroceryById(result.items[i]);
        }
        return result;
    });       
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