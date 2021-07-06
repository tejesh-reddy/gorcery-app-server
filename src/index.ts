import express from 'express';
import cors from 'cors';
const cookieSession = require('cookie-session');
import { ApolloServer } from 'apollo-server-express';
import { typedefs, resolvers } from './schema'
import { passport } from './auth/passport';
import jwt, { VerifyOptions } from 'jsonwebtoken';
import { GetUser } from './auth/auth0';
import { getUserById } from './service/UserService';

const app = express();
const PORT:number = 8080;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const server = new ApolloServer({
    resolvers,
    typeDefs: typedefs,
    context: ({req} : {req: any}) => {
        return {
            getUser: () => GetUser(req),// || getUserById('117964674981386088418'), // Default Dummy user
            logout: () => req.logout(),
        }
    },
    playground: {
        settings: {
            'request.credentials': 'include',
        }
    }
});

server.applyMiddleware({ app, path: "/graphql"})

app.listen(PORT, () => {
    console.log("Listening on port:", PORT)
});
