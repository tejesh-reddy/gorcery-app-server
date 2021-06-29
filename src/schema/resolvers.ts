import { MutationResolvers, Mutations, QueryResolvers, TypeResolvers } from "./schemaData";

export const resolvers = {
    Query: {
        ...QueryResolvers,
    },
    Mutation: {
        ...MutationResolvers
    },

    ...TypeResolvers,
};

