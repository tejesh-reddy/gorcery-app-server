import { Groceries } from "../GroceryData";
import { getAll } from "./groceries";
import { createTables } from "./tables";

var mysql = require('mysql');

export const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tejes#123',
    database: 'groceryTest'
});

connection.connect((err: unknown) => {
    if(err) {
        console.log('[DBConnect] Error connecting to DB - ', err);
        throw err;
    }    
    console.log('DB Connected Successfully');
});

createTables(connection);
export const getGroceriesAll = getAll(connection);
