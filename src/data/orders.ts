import { getDataArrayPromise } from "../helpers/dataPromise";
import { getFirstWords } from "../helpers/getFirstWords";
import { OrderTypeNew } from "../types/DomainTypes";
import { NoSerializor } from "./accessHelpers";
import {  toOrder, toOrdersArray } from "./accessHelpers/OrderData";
import { queries } from "./Queries";
import { executeQuery, getTableDef } from "./tables";


export const orderHelpers = (connection:any, tableName: string) => {

    const arrayAccessor = (query: string) => executeQuery(connection, tableName, query, toOrdersArray, getDataArrayPromise);
    const singleAccessor = (query: string) => executeQuery(connection, tableName, query, toOrder);
    const Queries = queries(tableName);

    const tableFields = getFirstWords(getTableDef(tableName).def);

    return {
        getAll: () => arrayAccessor(Queries.getAll()),
        getById: (id: number) => singleAccessor(Queries.getById(id)),

        insertOne: (value: OrderTypeNew) => executeQuery(connection, tableName, Queries.insert(value, tableFields), NoSerializor),
    }

}