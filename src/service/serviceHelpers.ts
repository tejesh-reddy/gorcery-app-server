import { selectFromObjectArray } from "../helpers/getFromArray";

export async function join(
    mainObject:any, 
    joinAccessObject:any,
    getResultById: any,
    joinColumn:string,
    field:string,
    joinField: string
    ){
        let joinValue = await joinAccessObject.getByField(joinColumn, mainObject.id);
        console.log(joinValue)


        mainObject[field] = selectFromObjectArray(joinValue, joinField);

        for(let i = 0; i < mainObject[field].length; i++) {
            mainObject[field][i] = await getResultById(mainObject[field][i]);
        }
        return mainObject;
}