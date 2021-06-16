export type GroceryTypeNew = {
    name: string,
    cost: number,
    category_id: number,
}

export type GroceryType = {id: number} & GroceryTypeNew;

export type CategoryType = {
    id: number,
    name: string,
}

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

export type AddressType = {
    id: number,
    house_no: string,
    city: string,
    street: string,
    postal_code: number,
}
