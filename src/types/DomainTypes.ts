export type GroceryTypeNew = {
    name: string,
    cost: number,
    category_id: number,
}

export type GroceryType = {id: number} & GroceryTypeNew;



export type OrderTypeNew = {
    status: string,
};

export type OrderType = {id:number} & OrderTypeNew;

export type OrderItemsType = {
    grocery_id:number,
    order_id:number,
    quantity:number,
}

export type UserType = {
    id: number,
    username: string,
    email_id: string,
}
