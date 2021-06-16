import { getAllOrders, getOrderById } from "../../service/OrderService";

export const OrderQueries = `
    orders: [Order!]
    orderById(id:Int!): Order
`;

export const OrderResolvers = {
    orders: () => getAllOrders(),
    orderById: (_:unknown, {id}:{id: number}) => getOrderById(id),
}