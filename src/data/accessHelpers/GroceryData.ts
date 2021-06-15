export type GroceryTypeNew = {
    name: string,
    cost: number,
}

export type GroceryType = {id: number} & GroceryTypeNew;

export const toGrocery = (data: any) => {
    let grocery:GroceryType = {
        id: data.id,
        name: data.name,
        cost: data.cost
    }

    return grocery;
}

export const toGroceryArray = (data: any[]) => {
    let result:GroceryType[] = []
    for(let grocery of data){
        result.push(toGrocery(grocery));
    }

    return result;
}

