var gql = require('graphql-tag');
import { userQuery } from './queries';

export const typedefs = gql`
    type Query {
        ${userQuery}
    }
`