import express from 'express';
import cors from 'cors';
import session from 'express-session';
const {v4: uuidv4} = require('uuid')
var MySqlStore = require('express-mysql-session');
import { ApolloServer } from 'apollo-server-express';
import { typedefs, resolvers } from './schema'
import { connection } from './data';
import { passport } from './auth/passport';

const app = express();
const PORT:number = 8080;

app.use("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const sessionStore:any = new MySqlStore({}, connection);
const options:any = {
    genid: (req:any) => uuidv4(),
    secret: 'some_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}

app.use(session ({
    ...options,
}));

app.use(passport.initialize());
app.use(passport.session());


app.get("/", () => "logged in")

// Authentication route
app.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ['profile', 'email']
    })
  );
  
app.get(
    "/auth/google/redirect",
    passport.authenticate('google'), (req: any, res: any) => {
        res.send(req.user)
    }
)

app.get('/logout', (req:any, res:any) => {
    console.log(req.user)
    console.log('logged out')
    req.logout()
    res.send('logged out')
})

const server = new ApolloServer({
    resolvers,
    typeDefs: typedefs,
    context: ({req} : {req: any}) => {
        return {
            getUser: () => req.user,
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
