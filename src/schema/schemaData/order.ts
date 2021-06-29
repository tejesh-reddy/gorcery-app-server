import { getAllOrders, getOrderAddress, getOrderById, getOrderItems } from "../../service/OrderService";

export const OrderQueries = `
    orders: [Order!]
    orderById(id:Int!): Order
`;


export const OrderQueryResolvers = {
    orders: () => getAllOrders(),
    orderById: (_:unknown, {id}:{id: number}) => getOrderById(id),
}

export const OrderTypeResolvers = {
    Order: {
        items: (parent:any) => getOrderItems(parent),
        address: (parent: any) => getOrderAddress(parent),
    }
}