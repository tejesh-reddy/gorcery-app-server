var gql = require('graphql-tag');
import { Queries } from './schemaData';



export const typedefs = gql`
    type Query {
        ${Queries.UserQueries}
        ${Queries.GroceryQueries}
        ${Queries.OrderQueries}
        ${Queries.CategoryQueries}
    }

    type User {
        id: Int!
        username: String
        email_id: String
        address: Address
        orders: [Order!]
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

    type Grocery {
        name: String
        cost: Int
        id: Int!
        category_id: Int
    }

    type Order {
        id: Int
        status: String
        items: [Grocery!]
        user_id: Int!
    }

`