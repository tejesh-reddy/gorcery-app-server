import { Resolvers } from "./schemaData";

export const resolvers = {
    Query: {
        me: () => "working",
        ...Resolvers,
    }
};

