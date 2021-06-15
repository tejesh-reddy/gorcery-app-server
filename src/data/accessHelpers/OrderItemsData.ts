import { OrderItemsType } from "../../types/DomainTypes";

export const toOrderItems = (data: any) => {
    let orderItems:OrderItemsType = {
        grocery_id: data.grocery_id,
        order_id: data.order_id,
        quantity: data.quantity
    }

    return orderItems;
}

export const toOrderItemsArray = (data: any[]) => {
    let result:OrderItemsType[] = []
    for(let grocery of data){
        result.push(toOrderItems(grocery));
    }

    return result;
}