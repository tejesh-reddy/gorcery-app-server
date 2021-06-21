import { MutationResolvers, Mutations, QueryResolvers } from "./schemaData";

export const resolvers = {
    Query: {
        ...QueryResolvers,
    },
    Mutation: {
        ...MutationResolvers
    }
};

