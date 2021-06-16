import { mergeFieldOfObjectArray } from "../helpers/getFromArray";

export async function join(
    mainObject:any, 
    mainAccessObject: any,
    joinAccessObject:any,
    joinColumn:string,
    field:string,
    joinField: string,
    toGql: any){
        let joinValue = await joinAccessObject.getByField(joinColumn, mainObject.id);
        let result = toGql(mainObject);

        result[field] = mergeFieldOfObjectArray(joinValue, joinField)

        return result;
}