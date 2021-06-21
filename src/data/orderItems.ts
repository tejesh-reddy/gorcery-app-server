import { getDataArrayPromise, getInsertIdPromise } from "../helpers/dataPromise";
import { getFirstWords } from "../helpers/getFirstWords";
import { OrderItemsType } from "../types/DomainTypes";
import { NoSerializor } from "./accessHelpers";
import { toOrderItems, toOrderItemsArray } from "./accessHelpers/OrderItemsData";
import { queries } from "./Queries";
import { executeInsert, executeQuery, getTableDef } from "./tables";




export const orderItemsHelpers = (connection:any, tableName: string) => {

    const arrayAccessor = (query: string) => executeQuery(connection, tableName, query, toOrderItemsArray, getDataArrayPromise);
    const singleAccessor = (query: string) => executeQuery(connection, tableName, query, toOrderItems);
    const Queries = queries(tableName)
    
    const tableFields = getFirstWords(getTableDef(tableName).def);



    return {
        getAll: () => arrayAccessor(Queries.getAll()),
        getByField: (fieldName: string, value: any) => arrayAccessor(Queries.getByField(fieldName, value)),

        insertOne: (value: OrderItemsType) => executeInsert(connection, Queries.insert(value, tableFields)),
        removeGrocery: (order_id: number, grocery_id: number) => {
            return executeInsert(connection, Queries.deleteOnFields("grocery_id", grocery_id, "order_id", order_id), NoSerializor);
        }
    };
}