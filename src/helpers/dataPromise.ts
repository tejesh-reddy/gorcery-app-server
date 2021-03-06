export const getDataPromise = (connection:any, sql:any, operation:any) => {
    return new Promise((resolve) => { 
        connection.query(sql, (err: unknown, data: any) => {
        if(err){
            console.log('Error retrieving values - QUERY ---', sql);
            throw err;
        }else{
            return resolve(operation(data[0]));
        }

    });
})
}

export const getDataArrayPromise = (connection:any, sql:any, operation:any) => {
    return new Promise((resolve) => {
        connection.query(sql, (err:unknown, data:any) => {
        if(err){
            console.log('Error retrieving values - QUERY');
            throw err;
        }
        return resolve(operation(data))
    });
})
}

export function getInsertIdPromise(connection: any, sql: any) {
    return new Promise((resolve) => {
        connection.query(sql, (err: unknown, result: any) => {
            if(err) {
                console.log('Error adding to DB -- INSERT', sql);
                throw err;
            }
            return resolve(result.insertId);
        })
    });
}

export function plainDataPromise(connection: any, sql: any) {
    return new Promise((resolve) => {
        connection.query(sql, (err: unknown, result: any) => {
            if(err){
                console.log('Error executing query -- ', sql);
                throw err;
            }
            return resolve(result);
        })
    })
}
