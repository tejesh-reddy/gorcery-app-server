import { getDataArrayPromise } from "../helpers/dataPromise";
import { getFirstWords } from "../helpers/getFirstWords";
import { NoSerializor } from "./accessHelpers";
import { toGrocery, toGroceryArray } from "./accessHelpers/GroceryData";
import { OrderItemsType, toOrderItems, toOrderItemsArray } from "./accessHelpers/OrderItemsData";
import { queries } from "./Queries";
import { executeQuery, getTableDef } from "./tables";




export const orderItemsHelpers = (connection:any, tableName: string) => {

    const arrayAccessor = (query: string) => executeQuery(connection, tableName, query, toOrderItemsArray, getDataArrayPromise);
    const singleAccessor = (query: string) => executeQuery(connection, tableName, query, toOrderItems);
    const Queries = queries(tableName)
    
    const tableFields = getFirstWords(getTableDef(tableName).def);



    return {
        getAll: () => arrayAccessor(Queries.getAll()),
        getByOrderId: (orderId:number) => arrayAccessor(Queries.getByField("order_id", orderId)),

        insertOne: (value: OrderItemsType) => executeQuery(connection, tableName, Queries.insert(value, tableFields), NoSerializor),
    }
}