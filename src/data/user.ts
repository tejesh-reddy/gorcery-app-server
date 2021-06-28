import { getDataArrayPromise, getInsertIdPromise } from "../helpers/dataPromise";
import { getFirstWords } from "../helpers/getFirstWords";
import { UserType, UserTypeNew } from "../types/DomainTypes";
import { UserGqlType } from "../types/GqlTypes";
import { NoSerializor } from "./accessHelpers";
import { toUser, toUserArray } from "./accessHelpers/UserData";
import { queries } from "./Queries";
import { executeInsert, executeQuery, getTableDef } from "./tables";


export const userHelpers = (connection:any, tableName: string) => {

    const arrayAccessor = (query: string) => executeQuery(connection, tableName, query, toUserArray, getDataArrayPromise);
    const singleAccessor = (query: string) => executeQuery(connection, tableName, query, toUser);
    const Queries = queries(tableName);
    
    const tableFields = getFirstWords(getTableDef(tableName).def);


    return {
        getAll: () => arrayAccessor(Queries.getAll()),
        getById: (id: number) => singleAccessor(Queries.getById(id)),
        getByToken: (token: string) => singleAccessor(Queries.getByField("token", token)),
        getByField: (fieldName: string, value: any) => arrayAccessor(Queries.getByField(fieldName, value)),

        insertOne: (value: UserType) => executeInsert(connection, Queries.insert(value, tableFields), getInsertIdPromise),
        updateCart: (id: number, cart_id: number) => executeInsert(connection, Queries.update(id, "cart_id", cart_id)),
        emptyCart: (id: number) => executeInsert(connection, Queries.updateToNull(id, "cart_id")),
    }
}