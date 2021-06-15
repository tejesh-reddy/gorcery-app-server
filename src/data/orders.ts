import { getDataArrayPromise } from "../helpers/dataPromise";
import { toOrder, toOrdersArray } from "./accessHelpers/OrderData";
import { queries } from "./Queries";
import { getAccessor } from "./tables";


export const orderHelpers = (connection:any, tableName: string) => {

    const arrayAccessor = (query: string) => getAccessor(connection, tableName, query, toOrdersArray, getDataArrayPromise);
    const singleAccessor = (query: string) => getAccessor(connection, tableName, query, toOrder);
    const Queries = queries(tableName);

    return {
        getAll: () => arrayAccessor(Queries.getAll()),
        getById: (id: number) => singleAccessor(Queries.getById(id)),
    }

}