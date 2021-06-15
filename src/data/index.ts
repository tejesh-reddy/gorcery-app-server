import { Groceries, Grocery } from "./GroceryData";
import { Orders, Order } from "./OrderData";
import { connection, getGroceriesAll } from "./accessHelpers";

console.log(getGroceriesAll());

export { Groceries, Orders, Order, Grocery, connection };