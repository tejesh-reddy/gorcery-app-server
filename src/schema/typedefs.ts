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
        id: Int
        username: String
        email_id: String
        address: Address
        orders: [Order!]
    }

    type NewUser {
        username: String
        email_id: String
        address: Address
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
        cost: Int
        id: Int!
        category_id: Int
    }

    type Order {
        status: String
        items: [Item!]
        user_id: Int!
    }

    input OrderInput {
        status: String
        items: [Item!]
    }

`