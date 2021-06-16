import { AddressType } from "../../types/DomainTypes";
import { AddressGqlType } from "../../types/GqlTypes";



export function toAddress(data: any) : AddressType {
    let address : AddressType = {...data};

    return address;
}

export function toAddressArray(data: any) : AddressType[] {
    data.map(toAddress);

    return data;
}

export function toGql(data: AddressType) : AddressGqlType {
    let result : AddressGqlType = {...data, groceries:[]};

    return result;

}