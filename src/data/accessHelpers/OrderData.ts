
export type OrderType = {
    id: number,
    status: string,
};

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