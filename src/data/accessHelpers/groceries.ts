const tableName = "grocery";

export function getAll(connection:any){
    let sql = "SELECT * FROM " + tableName;
    return async function select(){
        connection.query(sql, (err:unknown, data:any) => {
            console.log(err, data);
            return data;
        });
    }
}