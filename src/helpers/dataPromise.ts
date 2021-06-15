export const getDataPromise = (connection:any, sql:any, operation:any) => {
    return new Promise((resolve) => { 
        connection.query(sql, (err: unknown, data: any) => {
        if(err){
            console.log('Error retrieving values - GROCERY_SELECT');
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
            console.log('Error retrieving values - GROCERY_SELECT');
            throw err;
        }
        return resolve(operation(data))
    });
})
}

