import { authorizeUser } from "../../../auth/authorizeUser";
import { updateOrderAddress } from "../../../service/OrderService";


export const OrderMutations = `
    changeAddress(id: Int! address: AddressInput): Order
`;

export const OrderMutationResolvers = {
    changeAddress: (_:unknown, {id, address} : {id: any, address: any}, context:any) => authorizeUser(context.getUser).then(() => updateOrderAddress(id, address)) 
}