export type OrderItemsType = {
    grocery_id:number,
    order_id:number,
    quantity:number,
}

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