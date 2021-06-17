import { AddressType, CategoryType, GroceryType, OrderType, UserType } from "./DomainTypes";

export type GroceryGqlType = GroceryType;

export type ItemGqlType = {quantity: number} & GroceryGqlType;

export type OrderGqlType = OrderType & {items: ItemGqlType[]};

export type CategoryGqlType = CategoryType & {groceries: GroceryGqlType[]}

export type UserGqlType = UserType & {address: AddressGqlType | number, orders: OrderGqlType[], cart: OrderGqlType | number};

export type AddressGqlType = AddressType;