import { getOrderById } from "../../service/OrderService";
import { OrderType } from "../../types/DomainTypes";
import { OrderGqlType } from "../../types/GqlTypes";


export const toOrder = (data: any) => {

    if(data === undefined) {
        return {
            id: null,
            status: null,
            address_id: null,
        };
    }

    let order:OrderType = {
        id: data.id,
        status: data.status,
        address_id: data.address_id,
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
    let OrderGqlObject:OrderGqlType = {...data, items: [], address: null};

    return OrderGqlObject;
}