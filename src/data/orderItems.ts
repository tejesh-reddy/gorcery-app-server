import { getDataArrayPromise } from "../helpers/dataPromise";
import { getFirstWords } from "../helpers/getFirstWords";
import { OrderItemsType } from "../types/DomainTypes";
import { NoSerializor } from "./accessHelpers";
import { toOrderItems, toOrderItemsArray } from "./accessHelpers/OrderItemsData";
import { queries } from "./Queries";
import { executeQuery, getTableDef } from "./tables";




export const orderItemsHelpers = (connection:any, tableName: string) => {

    const arrayAccessor = (query: string) => executeQuery(connection, tableName, query, toOrderItemsArray, getDataArrayPromise);
    const singleAccessor = (query: string) => executeQuery(connection, tableName, query, toOrderItems);
    const Queries = queries(tableName)
    
    const tableFields = getFirstWords(getTableDef(tableName).def);



    return {
        getAll: () => arrayAccessor(Queries.getAll()),
        getByField: (fieldName: string, value: any) => arrayAccessor(Queries.getByField(fieldName, value)),

        insertOne: (value: OrderItemsType) => executeQuery(connection, tableName, Queries.insert(value, tableFields), NoSerializor),
    }
}