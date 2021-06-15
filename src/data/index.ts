import { OrderItemsType } from "./accessHelpers";
import { GroceryTypeNew } from "./accessHelpers/GroceryData";
import { OrderTypeNew } from "./accessHelpers/OrderData";
import { groceryHelpers } from "./groceries";
import { orderItemsHelpers } from "./orderItems";
import { orderHelpers } from "./orders";
import { createTables } from "./tables";


var mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tejes#123',
    database: 'testGrocery'
});

connection.connect((err: unknown) => {
    if(err) {
        console.log('[DBConnect] Error connecting to DB - ', err);
        throw err;
    }    
    console.log('DB Connected Successfully');
});

createTables(connection);

const groceryAccess = groceryHelpers(connection, "grocery");
const orderAccess = orderHelpers(connection, "orders");
const orderItemsAccess = orderItemsHelpers(connection, "order_items");

const Order:OrderTypeNew = {
    status: 'nott ok'
};

orderAccess.insertOne(Order);

export {
    connection,
    groceryAccess,
    orderAccess,
    orderItemsAccess,
}
