
export default function getFromObjectArray<T>(
    source: T[], 
    key : keyof T, 
    keyValue: T[keyof T]
    ):T{
        return source.filter(obj => obj[key] === keyValue)[0];
}
