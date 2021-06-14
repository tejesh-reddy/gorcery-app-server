import { Queries } from "./schemaData";

export const resolvers = {
    Query: {
        me: () => "working",
        ...Queries,
    }
};

