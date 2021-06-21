import { getDataArrayPromise } from "../helpers/dataPromise";
import { getFirstWords } from "../helpers/getFirstWords";
import { OrderTypeNew } from "../types/DomainTypes";
import { NoSerializor } from "./accessHelpers";
import {  toOrder, toOrdersArray } from "./accessHelpers/OrderData";
import { queries } from "./Queries";
import { executeInsert, executeQuery, getTableDef } from "./tables";


export const orderHelpers = (connection:any, tableName: string) => {

    const arrayAccessor = (query: string) => executeQuery(connection, tableName, query, toOrdersArray, getDataArrayPromise);
    const singleAccessor = (query: string) => executeQuery(connection, tableName, query, toOrder);
    const Queries = queries(tableName);

    const tableFields = getFirstWords(getTableDef(tableName).def);

    return {
        getAll: () => arrayAccessor(Queries.getAll()),
        getById: (id: number) => singleAccessor(Queries.getById(id)),
        getByField: (fieldName: string, value: any) => arrayAccessor(Queries.getByField(fieldName, value)),
        orderOfUser: (userId: number) => arrayAccessor(Queries.getByField("user_id", userId)),

        insertOne: (value: OrderTypeNew) => executeInsert(connection, Queries.insert(value, tableFields)),
    }

}