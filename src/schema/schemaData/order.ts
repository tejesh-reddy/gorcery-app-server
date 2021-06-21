import { getAllOrders, getOrderById } from "../../service/OrderService";

export const OrderQueries = `
    orders: [Order!]
    orderById(id:Int!): Order
`;


export const OrderQueryResolvers = {
    orders: () => getAllOrders(),
    orderById: (_:unknown, {id}:{id: number}) => getOrderById(id),
}