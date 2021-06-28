
import { addressHelpers } from "./address";
import { categoryHelpers } from "./category";
import { groceryHelpers } from "./groceries";
import { orderItemsHelpers } from "./orderItems";
import { orderHelpers } from "./orders";
import { createTables } from "./tables";
import { userHelpers } from "./user";
import { userOrderHelpers } from "./userOrder";


var mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tejes#123',
    database: 'groceryApp'
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
const categoryAccess = categoryHelpers(connection, 'category');
const userAccess = userHelpers(connection, "user");
const addressAccess = addressHelpers(connection, "address");
const userOrderAccess = userOrderHelpers(connection, "user_orders")

export {
    connection,
    groceryAccess,
    orderAccess,
    orderItemsAccess,
    categoryAccess,
    userAccess,
    addressAccess,
    userOrderAccess,
}
