import { getOrderById } from "../../service/OrderService";
import { OrderType } from "../../types/DomainTypes";
import { OrderGqlType } from "../../types/GqlTypes";


export const toOrder = (data: any) => {
    let order:OrderType = {
        id: data.id,
        status: data.status,
        
    }
    return order;
}

export const toOrdersArray = (data: any[]) => {
    let result:OrderType[] = []
    for(let order of data){
        result.push(toOrder(order));
    }

    return result;
}

export async function toGql(data: OrderType) {
    let order:OrderGqlType = {
        ...data,
        items:[]
    }
    getOrderById(data.id).then((result:any) => {
        order.items=result; 
        return order;
    });
}