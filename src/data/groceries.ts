import { getDataArrayPromise } from "../helpers/dataPromise";
import { toGrocery, toGroceryArray } from "./accessHelpers/GroceryData";
import { queries } from "./Queries";
import { getAccessor } from "./tables";




export const groceryHelpers = (connection:any, tableName: string) => {

    const arrayAccessor = (query: string) => getAccessor(connection, tableName, query, toGroceryArray, getDataArrayPromise);
    const singleAccessor = (query: string) => getAccessor(connection, tableName, query, toGrocery);
    const Queries = queries(tableName)


    return {
        getAll: () => arrayAccessor(Queries.getAll()),
        getById: (id: number) => singleAccessor(Queries.getById(id)),
    }
}