import { getDataArrayPromise } from "../helpers/dataPromise";
import { getFirstWords } from "../helpers/getFirstWords";
import { GroceryTypeNew } from "../types/DomainTypes";
import { NoSerializor } from "./accessHelpers";
import { toGrocery, toGroceryArray } from "./accessHelpers/GroceryData";
import { queries } from "./Queries";
import { executeQuery, getTableDef } from "./tables";




export const groceryHelpers = (connection:any, tableName: string) => {

    const arrayAccessor = (query: string) => executeQuery(connection, tableName, query, toGroceryArray, getDataArrayPromise);
    const singleAccessor = (query: string) => executeQuery(connection, tableName, query, toGrocery);
    const Queries = queries(tableName);
    
    const tableFields = getFirstWords(getTableDef(tableName).def);


    return {
        getAll: () => arrayAccessor(Queries.getAll()),
        getById: (id: number) => singleAccessor(Queries.getById(id)),
        getByName: (name: string) => singleAccessor(Queries.getByField("name", name)),

        insertOne: (value: GroceryTypeNew) => executeQuery(connection, tableName, Queries.insert(value, tableFields), NoSerializor),
    }
}