var gql = require('graphql-tag');
import { GroceryQuery, UserQuery } from './schemaData';
import { OrderQueries } from './schemaData/order';

export const typedefs = gql`
    type Query {
        ${UserQuery}
        ${GroceryQuery}
        ${OrderQueries}
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