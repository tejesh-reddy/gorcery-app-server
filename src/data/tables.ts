import { getDataPromise, getInsertIdPromise } from "../helpers/dataPromise";
import { getFromObjectArray } from "../helpers/getFromArray";

export type TableDefType = {
    name: string,
    def: string,
}

const TableDefs:TableDefType[] = [

    {
        name: "category",
        def: `id INT AUTO_INCREMENT,
        name VARCHAR(25),
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
        name: "orders",
        def: `id INT PRIMARY KEY AUTO_INCREMENT,
        status VARCHAR(10),
        address_id INT,
        CONSTRAINT FOREIGN KEY FK_Address (address_id)
        REFERENCES address(id)`
    },
    {
        name: "user",
        def: `id VARCHAR(40) PRIMARY KEY,
        username VARCHAR(60),
        email_id VARCHAR(60) NOT NULL,
        cart_id INT,
        CONSTRAINT FOREIGN KEY FK_Cart (cart_id)
        REFERENCES orders(id)`
    },
    {
        name: "user_orders",
        def: `user_id VARCHAR(25) NOT NULL,
        order_id INT NOT NULL,
        PRIMARY KEY(user_id, order_id),
        CONSTRAINT FOREIGN KEY FK_User (user_id)
        REFERENCES user(id),
        CONSTRAINT FOREIGN KEY FK_OrderID (order_id)
        REFERENCES orders(id)`
    },
    {
        name:"grocery",
        def: `id INT AUTO_INCREMENT, 
        name VARCHAR(50),
        cost DECIMAL(6, 2),
        unit VARCHAR(12),
        url VARCHAR(120),
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

export const executeInsert = (connection: any, query: string, idPromise=getInsertIdPromise):Promise<any> => {
    return idPromise(connection, query);
}

export const getTableDef = (tablename:string) => getFromObjectArray<TableDefType>(TableDefs, "name", tablename);