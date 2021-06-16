
export function getFromObjectArray<T>(
    source: T[], 
    key : keyof T, 
    keyValue: T[keyof T]
    ):T{
        return source.filter(obj => obj[key] === keyValue)[0];
}

export function mergeFieldOfObjectArray(array: any[], fieldName: string) {
    let result = [];

    for(let obj of array) {
        result.push(obj[fieldName]);
    }

    return result;
}