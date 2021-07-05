import express from 'express';
import cors from 'cors';
const cookieSession = require('cookie-session');
import { ApolloServer } from 'apollo-server-express';
import { typedefs, resolvers } from './schema'
import { passport } from './auth/passport';
import jwt, { VerifyOptions } from 'jsonwebtoken';
import { GetUser } from './auth/auth0';

const app = express();
const PORT:number = 8080;

// TODO: Implement better OAuth 




app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}));



// passport 
//app.use(passport.initialize());
//app.use(passport.session());


// Authentication route (TODO)
app.get('/login', (req, res) => {
    res.send({login: 'success'})
})

app.get('/logout', (req:any, res:any) => {
    req.logout()
})

const server = new ApolloServer({
    resolvers,
    typeDefs: typedefs,
    context: ({req} : {req: any}) => {
        return {
            getUser: () => GetUser(req), //|| getUserById('117964674981386088418'),
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
