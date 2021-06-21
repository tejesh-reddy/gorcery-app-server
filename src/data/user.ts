import { getDataArrayPromise } from "../helpers/dataPromise";
import { getFirstWords } from "../helpers/getFirstWords";
import { UserGqlType } from "../types/GqlTypes";
import { NoSerializor } from "./accessHelpers";
import { toUser, toUserArray } from "./accessHelpers/UserData";
import { queries } from "./Queries";
import { executeQuery, getTableDef } from "./tables";


export const userHelpers = (connection:any, tableName: string) => {

    const arrayAccessor = (query: string) => executeQuery(connection, tableName, query, toUserArray, getDataArrayPromise);
    const singleAccessor = (query: string) => executeQuery(connection, tableName, query, toUser);
    const Queries = queries(tableName);
    
    const tableFields = getFirstWords(getTableDef(tableName).def);


    return {
        getAll: () => arrayAccessor(Queries.getAll()),
        getById: (id: number) => singleAccessor(Queries.getById(id)),
        getByUsername: (name: string) => singleAccessor(Queries.getByField("username", name)),
        getByToken: (token: string) => singleAccessor(Queries.getByField("token", token)),
        getByField: (fieldName: string, value: any) => arrayAccessor(Queries.getByField(fieldName, value)),

        insertOne: (value: UserGqlType) => executeQuery(connection, tableName, Queries.insert(value, tableFields), NoSerializor),
    }
}