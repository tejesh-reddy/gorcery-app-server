import { getDataArrayPromise } from "../helpers/dataPromise";
import { getFirstWords } from "../helpers/getFirstWords";
import { UserOrderType } from "../types/DomainTypes";
import { NoSerializor } from "./accessHelpers";
import { toUserOrders, toUserOrdersArray } from "./accessHelpers/userOrdersData";
import { queries } from "./Queries";
import { executeQuery, getTableDef } from "./tables";



export const userOrderHelpers = (connection:any, tableName: string) => {

    const arrayAccessor = (query: string) => executeQuery(connection, tableName, query, toUserOrdersArray, getDataArrayPromise);
    const singleAccessor = (query: string) => executeQuery(connection, tableName, query, toUserOrders);
    const Queries = queries(tableName)
    
    const tableFields = getFirstWords(getTableDef(tableName).def);



    return {
        getAll: () => arrayAccessor(Queries.getAll()),
        getByField: (fieldName: string, value: any) => arrayAccessor(Queries.getByField(fieldName, value)),

        insertOne: (value: UserOrderType) => executeQuery(connection, tableName, Queries.insert(value, tableFields), NoSerializor),
    }
}