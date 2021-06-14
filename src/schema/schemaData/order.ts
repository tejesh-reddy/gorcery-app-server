import { getAllGroceries } from "../../service/GroceryService";
import { getAllOrders } from "../../service/OrderService";

export const OrderQueries = `
    orders: [Order!]
`;

export const OrderResolvers = {
    orders: () => getAllOrders(),
}