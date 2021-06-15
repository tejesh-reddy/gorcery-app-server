

export const queries = (tablename: string) => {

    const selectAll = (tablename: string) => `SELECT * FROM ${tablename}`;

    function insertOne(value:any, fieldNames: string[]):string {
        let table = `INSERT INTO ${tablename}(`;
        let values = `VALUES (`;

        for(let field of fieldNames) {
            if(value[field] !== undefined){
                table += `${field}, `
                if(typeof value[field] === 'number')
                    values += ""+value[field]+", ";
                else
                    values += "'" + value[field]+"', "

            console.log('---------', value[field], field)
            }
        }

        table = table.substring(0, table.length-2)+ ') ';
        values = values.substring(0, values.length-2)+ ')';

        console.log(table+values);

        return table+values;
    }

    return {
        getAll: () => selectAll(tablename),
        getById: (id:number|string) => `${selectAll(tablename)} WHERE id=${id}`,
        getByField: (fieldname:string, value: number|string) => `${selectAll(tablename)} WHERE ${fieldname}=${value}`,

        insert: insertOne

    };
};