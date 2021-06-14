const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
import { typedefs, resolvers } from './schema'

const app = express();
const PORT:number = 8080;

app.use("*", cors());

const server = new ApolloServer({
    resolvers,
    typeDefs: typedefs,
});

server.applyMiddleware({ app, path: "/graphql"})

app.listen(PORT, () => {
    console.log("Listening on port:", PORT)
})