import { OrderItemsType, UserOrderType } from "../../types/DomainTypes";

export const toUserOrders = (data: any) => {
    let orderItems:UserOrderType = {
        user_id: data.user_id,
        order_id: data.order_id,
    }

    return orderItems;
}

export const toUserOrdersArray = (data: any[]) => {
    let result:UserOrderType[] = []
    for(let grocery of data){
        result.push(toUserOrders(grocery));
    }

    return result;
}