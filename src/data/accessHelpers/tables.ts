
const TableDefs:{[key: string]: string}[] = [
    {
        name:"grocery",
        def: `id INT AUTO_INCREMENT, 
        name VARCHAR(50), 
        cost INTEGER,
        PRIMARY KEY (id)`
    },

    {  
        name: "orders",
        def: `id INT PRIMARY KEY AUTO_INCREMENT, status VARCHAR(10)`
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
        console.log(createStatement);
        connection.query(createStatement, (err:unknown) => {
            if(err) {
                console.log('[DB_CREATE_TABLE] Error creating', table.name);
                throw err;
            }
        })
    });

    console.log("Tables created succesfully");
}