import { OrderItemsType } from "../../types/DomainTypes";

export const toUserOrders = (data: any) => {
    let orderItems:OrderItemsType = {
        grocery_id: data.grocery_id,
        order_id: data.order_id,
        quantity: data.quantity
    }

    return orderItems;
}

export const toUserOrdersArray = (data: any[]) => {
    let result:OrderItemsType[] = []
    for(let grocery of data){
        result.push(toUserOrders(grocery));
    }

    return result;
}