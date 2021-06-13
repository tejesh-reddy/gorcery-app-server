const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
import { typedefs, resolvers } from './schema'

const app = express();
const PORT:number = 8080;

app.use("*", cors());

app.get("/test", (req: Request, res: { send: (arg0: string) => void; }) => {
    res.send("working")
});

const server = new ApolloServer({
    resolvers,
    typeDefs: typedefs,
});

server.applyMiddleware({ app, path: "/graphql"})

app.listen(PORT, () => {
    console.log("Listening on port:", PORT)
})