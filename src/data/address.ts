import { getDataArrayPromise } from "../helpers/dataPromise";
import { getFirstWords } from "../helpers/getFirstWords";
import { AddressType } from "../types/DomainTypes";
import { NoSerializor } from "./accessHelpers";
import { toAddress, toAddressArray } from "./accessHelpers/AddressData";
import { queries } from "./Queries";
import { executeInsert, executeQuery, getTableDef } from "./tables";

export const addressHelpers = (connection:any, tableName: string) => {

    const arrayAccessor = (query: string) => executeQuery(connection, tableName, query, toAddressArray, getDataArrayPromise);
    const singleAccessor = (query: string) => executeQuery(connection, tableName, query, toAddress);
    const Queries = queries(tableName);
    
    const tableFields = getFirstWords(getTableDef(tableName).def);


    return {
        getAll: () => arrayAccessor(Queries.getAll()),
        getById: (id: number) => singleAccessor(Queries.getById(id)),

        insertOne: (value: AddressType) => executeInsert(connection, Queries.insert(value, tableFields)),
    }
}