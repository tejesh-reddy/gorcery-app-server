var gql = require('graphql-tag');
import { Mutations, Queries } from './schemaData';



export const typedefs = gql`
    type Query {
        ${Queries.UserQueries}
        ${Queries.GroceryQueries}
        ${Queries.OrderQueries}
        ${Queries.CategoryQueries}
    }

    type Mutation {
        ${Mutations.UserMutations}
    }

    type User {
        id: String
        username: String
        email_id: String
        orders: [Order!]
        cart: Order
    }
 
    type Category {
        id: Int!
        name: String
        groceries: [Grocery!]
    }

    type Address {
        house_no: String
        street: String
        city: String
        postal_code: Int
    }

    type Item {
        grocery: Grocery!
        quantity: Int!
    }

    type Grocery {
        name: String
        cost: Float
        unit: String
        image: String
        id: Int!
    }

    type Order {
        id: Int
        status: String
        items: [Item!]
        address: Address
    }

    input OrderInput {
        status: String
        items: [ItemInput!]
    }

    input ItemInput {
        grocery_id: Int!
        quantity: Int!
    }

`