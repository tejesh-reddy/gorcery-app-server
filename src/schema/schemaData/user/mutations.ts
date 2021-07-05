import { authorizeUser } from "../../../auth/authorizeUser"
import { clearCart, saveCart, updateUserCart } from "../../../service/UserService"

export const UserMutations = `
    logout: String
    updateCart(cart: OrderInput!): Order!
    placeOrder: Order!
    emptyCart: String!
`


export const UserMutationResolvers = {
    logout: (_:unknown, args: any, context: any) => context.logout(),
    updateCart: (_:unknown, { cart }:{cart: any}, context: any) => authorizeUser(context.getUser).then(user => updateUserCart(user, cart)),
    placeOrder: (_:unknown, args: any, context: any) => authorizeUser(context.getUser).then(saveCart),
    emptyCart: (_:unknown, args: any, context: any) => authorizeUser(context.getUser).then(clearCart).then(()=> "done"),
}