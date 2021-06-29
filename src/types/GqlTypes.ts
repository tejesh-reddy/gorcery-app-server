import { AddressType, CategoryType, GroceryType, OrderType, UserType } from "./DomainTypes";

export type GroceryGqlType = GroceryType;

export type ItemGqlType = {quantity: number} & GroceryGqlType;

export type OrderGqlType = OrderType & {items: ItemGqlType[], address: AddressGqlType | number};

export type CategoryGqlType = CategoryType & {groceries: GroceryGqlType[]}

export type UserGqlType = UserType & {orders: OrderGqlType[], cart: OrderGqlType | number};

export type AddressGqlType = AddressType;