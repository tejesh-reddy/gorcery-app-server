import { getDataArrayPromise } from "../helpers/dataPromise";
import { toGrocery, toGroceryArray } from "./accessHelpers/GroceryData";
import { toOrderItems, toOrderItemsArray } from "./accessHelpers/OrderItemsData";
import { queries } from "./Queries";
import { executeQuery } from "./tables";




export const orderItemsHelpers = (connection:any, tableName: string) => {

    const arrayAccessor = (query: string) => executeQuery(connection, tableName, query, toOrderItemsArray, getDataArrayPromise);
    const singleAccessor = (query: string) => executeQuery(connection, tableName, query, toOrderItems);
    const Queries = queries(tableName)


    return {
        getAll: () => arrayAccessor(Queries.getAll()),
        getById: (id: number) => singleAccessor(Queries.getById(id)),
    }
}