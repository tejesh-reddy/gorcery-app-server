import { getDataArrayPromise } from "../helpers/dataPromise";
import { toOrder, toOrdersArray } from "./accessHelpers/OrderData";
import { queries } from "./Queries";
import { executeQuery } from "./tables";


export const orderHelpers = (connection:any, tableName: string) => {

    const arrayAccessor = (query: string) => executeQuery(connection, tableName, query, toOrdersArray, getDataArrayPromise);
    const singleAccessor = (query: string) => executeQuery(connection, tableName, query, toOrder);
    const Queries = queries(tableName);

    return {
        getAll: () => arrayAccessor(Queries.getAll()),
        getById: (id: number) => singleAccessor(Queries.getById(id)),
    }

}