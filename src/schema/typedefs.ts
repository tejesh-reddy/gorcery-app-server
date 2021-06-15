var gql = require('graphql-tag');
import { Queries } from './schemaData';



export const typedefs = gql`
    type Query {
        ${Queries.UserQuery}
        ${Queries.GroceryQueries}
        ${Queries.OrderQueries}
    }

    type Grocery {
        name: String!
        cost: Int!
    }

    type Order {
        id: Int
        items: [Grocery!]
    }
`