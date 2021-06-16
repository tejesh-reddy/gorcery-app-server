import { mergeFieldOfObjectArray } from "../helpers/getFromArray";

export async function join(
    mainObject:any, 
    joinAccessObject:any,
    joinColumn:string,
    field:string,
    joinField: string,
    toGql: any){
        let joinValue = await joinAccessObject.getByField(joinColumn, mainObject.id);
        let result = toGql(mainObject);

        result[field] = mergeFieldOfObjectArray(joinValue, joinField);

        for(let i = 0; i < result[field].length; i++) {
            result[field][i] = await joinAccessObject.getById(result.items[i]);
        }
        return result;
}