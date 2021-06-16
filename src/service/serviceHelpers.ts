import { mergeFieldOfObjectArray } from "../helpers/getFromArray";

export async function join(
    mainObject:any, 
    joinAccessObject:any,
    joinColumn:string,
    field:string,
    joinField: string
    ){
        let joinValue = await joinAccessObject.getByField(joinColumn, mainObject.id);

        mainObject[field] = mergeFieldOfObjectArray(joinValue, joinField);

        for(let i = 0; i < mainObject[field].length; i++) {
            mainObject[field][i] = await joinAccessObject.getById(mainObject[field][i]);
        }
        return mainObject;
}