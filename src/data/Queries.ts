

export const queries = (tablename: string) => {

    const selectAll =`SELECT * FROM ${tablename}`;
    const deleteEntry = `DELETE FROM ${tablename}`;

    const getValue = (value: number|string) => {

        if(typeof value === 'number')
            return `${value}`;
        return `'${value}'`
    }

    const fieldsToValues = (value: any, fieldnames: string[]) => {
        let query = '(';
        let values ='('
        for(let field of fieldnames) {
            if(value[field] !== undefined && value[field] !== null){
                query += `${field}, `;
                values += getValue(value[field]) + ", ";
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

        return `INSERT INTO ${tablename} ${query} VALUES ${values}`
    }

    return {
        getAll: () => selectAll,
        getById: (id:number|string) => {
            if(typeof id === 'number')
                return `${selectAll} WHERE id=${id}`;
            return `${selectAll} WHERE id='${id}'`;
        },
        getByField: (fieldname:string, value: number|string) => {
            if(typeof value === 'number')
                return `${selectAll} WHERE ${fieldname}=${value}`;
            return `${selectAll} WHERE ${fieldname}='${value}'`;
        },

        insert: insertOne,

        delete: (id: number|string) => `${deleteEntry} WHERE id=${getValue(id)}`,

        deleteOnFields: (field1: string, value1: number|string, field2: string, value2: number|tring) => `${deleteEntry} 
        WHERE ${field1}=${getValue(value1)} 
        AND ${field2}=${getValue(value2)}`,

        update: (id: number|string, field:string, value:string) => `UPDATE ${tablename} SET ${field}=${getValue(value)}
        WHERE id=${id}`,


    };
};