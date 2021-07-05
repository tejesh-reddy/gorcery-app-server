var gql = require('graphql-tag');
import { Mutations, Queries, Typedefs } from './schemaData';



export const typedefs = gql`
    type Query {
        ${Queries.UserQueries}
        ${Queries.GroceryQueries}
        ${Queries.OrderQueries}
        ${Queries.CategoryQueries}
    }

    type Mutation {
        ${Mutations.UserMutations}
        ${Mutations.OrderMutations}
    }

    ${Typedefs}


    input OrderInput {
        status: String!
        items: [ItemInput!]
    }

    input ItemInput {
        grocery_id: Int!
        quantity: Int!
    }

    input AddressInput {
        house_no: String!
        street: String
        city: String!
        postal_code: Int!
    }

`