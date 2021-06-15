

export const queries = (tablename: string) => {

    const selectAll = (tablename: string) => `SELECT * FROM ${tablename}`;

    const fieldsToValues = (value: any, fieldnames: string[]) => {
        let query = '(';
        let values ='('
        for(let field of fieldnames) {
            if(value[field] !== undefined){
                query += `${field}, `
                if(typeof value[field] === 'number')
                    values += ""+value[field]+", ";
                else
                    values += "'" + value[field]+"', "
            }
        }

        query = query.substring(0, query.length-2) + ')';
        values = values.substring(0, values.length-2) + ')';

        return {
            query,
            values,

        }
    }

    function insertOne(value:any, fieldNames: string[]):string {
        let {query, values} = fieldsToValues(value, fieldNames);
        console.log(`INSERT INTO ${tablename} ${query} VALUES ${values}`);

        return `INSERT INTO ${tablename} ${query} VALUES ${values}`
    }

    return {
        getAll: () => selectAll(tablename),
        getById: (id:number|string) => `${selectAll(tablename)} WHERE id=${id}`,
        getByField: (fieldname:string, value: number|string) => `${selectAll(tablename)} WHERE ${fieldname}=${value}`,

        insert: insertOne

    };
};