import { getOrderById } from "../../service/OrderService";
import { OrderType } from "../../types/DomainTypes";
import { OrderGqlType } from "../../types/GqlTypes";


export const toOrder = (data: any) => {

    if(data === undefined) {
        return {
            id: null,
            status: null,
            user_id: null,
        };
    }

    let order:OrderType = {
        id: data.id,
        status: data.status,
        user_id: data.user_id,
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

export const toGql = (data: OrderType):OrderGqlType => {
    let OrderGqlObject:OrderGqlType = {...data, items: []};

    return OrderGqlObject;
}