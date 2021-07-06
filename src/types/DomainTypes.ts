export type GroceryTypeNew = {
    name: string,
    cost: number,
    unit: string,
    image: string,
}


export type GroceryType = {id: number} & GroceryTypeNew;

export type CategoryType = {
    id: number,
    name: string,
}

export type OrderTypeNew = {
    status: string,
};

export type OrderType = {id:number, address_id: number} & OrderTypeNew;

export type OrderItemsType = {
    grocery_id:number,
    order_id:number,
    quantity:number,
}

export type UserOrderType = {
    user_id:string,
    order_id:number,
}

export type UserTypeNew = {
    username: string,
    email_id: string,
    cart_id: number,
}

export type UserType = {id: string} & UserTypeNew;

export type AddressType = {
    house_no: string,
    city: string,
    street: string,
    postal_code: number,
}

