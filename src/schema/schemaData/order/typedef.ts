import { getOrderAddress, getOrderItems } from "../../../service/OrderService";

export const OrderTypedef = `
type Order {
    id: Int!
    status: String!
    items: [Item!]
    address: Address
}
type Address {
    house_no: String!
    street: String
    city: String!
    postal_code: Int!
}

type Item {
    grocery: Grocery!
    quantity: Int!
}`;

export const OrderTypeResolvers = {
    Order: {
        items: (parent:any) => getOrderItems(parent),
        address: (parent: any) => getOrderAddress(parent),
    }
}