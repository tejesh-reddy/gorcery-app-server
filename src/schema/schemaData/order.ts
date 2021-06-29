import { authorizeUser } from "../../auth/authorizeUser";
import { getAllOrders, getOrderAddress, getOrderById, getOrderItems, updateOrderAddress } from "../../service/OrderService";

export const OrderQueries = `
    orders: [Order!]
    orderById(id:Int!): Order
`;

export const OrderMutations = `
    changeAddress(id: Int! address: AddressInput): Order
`


export const OrderQueryResolvers = {
    orders: () => getAllOrders(),
    orderById: (_:unknown, {id}:{id: number}) => getOrderById(id),
}

export const OrderMutationResolvers = {
    changeAddress: (_:unknown, {id, address} : {id: any, address: any}, context:any) => authorizeUser(context.getUser()).then(() => updateOrderAddress(id, address)) 
}

export const OrderTypeResolvers = {
    Order: {
        items: (parent:any) => getOrderItems(parent),
        address: (parent: any) => getOrderAddress(parent),
    }
}