import { groceryHelpers } from "./groceries";
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

orderAccess.getAll().then(console.log)

export {
    connection,
    groceryAccess,
    orderAccess,
}
