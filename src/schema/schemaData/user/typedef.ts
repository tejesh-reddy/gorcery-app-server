import { getUserCart, getUserOrders } from "../../../service/UserService";

export const UserTypedef = `
type User {
    id: String!
    username: String!
    email_id: String!
    orders: [Order!]
    cart: Order
}
`;

export const UserTypeResolvers = {
   
    User: {
        orders: (parent: any) => getUserOrders(parent),
        cart: (parent: any) =>  getUserCart(parent),
    }
}