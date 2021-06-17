import { getDataPromise } from "../helpers/dataPromise";
import { getFromObjectArray } from "../helpers/getFromArray";

export type TableDefType = {
    name: string,
    def: string,
}

const TableDefs:TableDefType[] = [

    {
        name: "category",
        def: `id INT AUTO_INCREMENT,
        name VARCHAR(20),
        PRIMARY KEY(id)`
    },
    {
        name: "address",
        def: `id INT PRIMARY KEY AUTO_INCREMENT,
        house_no VARCHAR(8),
        street VARCHAR(15),
        city VARCHAR(15),
        postal_code INT`
    },
    {
        name: "cart",
        def: `id INT PRIMARY KEY AUTO_INCREMENT,
        c`

    },
    {
        name: "user",
        def: `id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(30) NOT NULL,
        password VARCHAR(70) NOT NULL,
        email_id VARCHAR(30) NOT NULL,
        address INT NOT NULL
        cart_id INT,
        CONSTRAINT FOREIGN KEY FK_Address (address)
        REFERENCES address(id)
        CONSTRAINT FOREIGN_KEY FK_Cart (cart_id)
        REFERENCES orders(id)`
    },
    {  
        name: "orders",
        def: `id INT PRIMARY KEY AUTO_INCREMENT,
        status VARCHAR(10),`
    },
    {
        name: "user_orders",
        def: `user_id INT NOT NULL,
        order_id INT NOT NULL,
        PRIMARY KEY(user_id, order_id),
        CONSTRAINT FOREIGN KEY FK_User (user_id)
        REFERENCES user(id),
        CONSTRAINT FOREIGN_KEY FK_Order (order_id)
        REFERENCES order(id)`
    },
    {
        name:"grocery",
        def: `id INT AUTO_INCREMENT, 
        name VARCHAR(50),
        cost INTEGER, 
        category_id INT NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT FOREIGN KEY FK_Category (category_id)
        REFERENCES category(id)`
    },
    {
        name: "order_items",
        def: `grocery_id INT, 
        order_id INT NOT NULL, 
        quantity INT NOT NULL,
        PRIMARY KEY(grocery_id, order_id),
        CONSTRAINT FOREIGN KEY FK_Grocery (grocery_id)
        REFERENCES grocery(id),
        CONSTRAINT FOREIGN KEY FK_Order (order_id)
        REFERENCES orders(id)`
    },

]

export function createTables(connection:any) {

    TableDefs.forEach(table => {
        let createStatement = `CREATE TABLE IF NOT EXISTS ${table.name} (${table.def})`
        connection.query(createStatement, (err:unknown) => {
            if(err) {
                console.log('[DB_CREATE_TABLE] Error creating', table.name,'--', createStatement);
                throw err;
            }
        })
    });

    console.log("Tables created succesfully");
}

export const executeQuery = (connection: any, tableName: string, query: string, serializer: any, dataPromise=getDataPromise) => {
    return dataPromise(connection, query, serializer);
}

export const getTableDef = (tablename:string) => getFromObjectArray<TableDefType>(TableDefs, "name", tablename);