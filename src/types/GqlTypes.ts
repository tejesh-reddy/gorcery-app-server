import { AddressType, CategoryType, GroceryType, OrderType, UserType } from "./DomainTypes";

export type GroceryGqlType = GroceryType;

export type OrderGqlType = OrderType & {items: GroceryGqlType[]};

export type CategoryGqlType = CategoryType & {groceries: GroceryGqlType[]}

export type UserGqlType = UserType & {address: AddressGqlType};

export type AddressGqlType = AddressType;