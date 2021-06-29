export type GroceryTypeNew = {
    name: string,
    cost: number,
    unit: string,
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

export type UserOrderType = {
    user_id:number,
    order_id:number,
}

export type UserTypeNew = {
    username: string,
    email_id: string,
    address_id: number,
    cart_id: number,
}

export type UserType = {id: number} & UserTypeNew;

export type AddressType = {
    house_no: string,
    city: string,
    street: string,
    postal_code: number,
}

