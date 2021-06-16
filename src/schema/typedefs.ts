var gql = require('graphql-tag');
import { Queries } from './schemaData';



export const typedefs = gql`
    type Query {
        ${Queries.UserQuery}
        ${Queries.GroceryQueries}
        ${Queries.OrderQueries}
        ${Queries.CategoryQueries}
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
    }

    type Category {
        id: Int!
        name: String
    }
`