import { getDataArrayPromise } from "../helpers/dataPromise";
import { getFirstWords } from "../helpers/getFirstWords";
import { NoSerializor } from "./accessHelpers";
import { CategoryType, toCategory } from "./accessHelpers/CategoryData";
import { queries } from "./Queries";
import { executeQuery, getTableDef } from "./tables";


export const categoryHelpers = (connection: any, tableName: string) => {
    const arrayAccessor = (query: string) => executeQuery(connection, tableName, query, toCategory, getDataArrayPromise);
    const singleAccessor = (query: string) => executeQuery(connection, tableName, query, toCategory);
    const Queries = queries(tableName);
    
    const tableFields = getFirstWords(getTableDef(tableName).def);


    return {
        getAll: () => arrayAccessor(Queries.getAll()),
        getById: (id: number) => singleAccessor(Queries.getById(id)),
        getByName: (name: string) => singleAccessor(Queries.getByField("name", name)),

        insertOne: (value: CategoryType) => executeQuery(connection, tableName, Queries.insert(value, tableFields), NoSerializor),
    }
}