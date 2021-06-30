import express from 'express';
import cors from 'cors';
import session from 'express-session';
const {v4: uuidv4} = require('uuid')
var MySqlStore = require('express-mysql-session');
const {createProxyMiddleware} = require('http-proxy-middleware');
const cookieSession = require('cookie-session');
import { ApolloServer } from 'apollo-server-express';
import { typedefs, resolvers } from './schema'
import { connection } from './data';
import { passport } from './auth/passport';
import { getUserById } from './service/UserService';

const app = express();
const PORT:number = 8080;

// TODO: Implement better OAuth 




app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
  }))

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

/*const sessionStore:any = new MySqlStore({}, connection);
const options:any = {
    genid: (req:any) => uuidv4(),
    secret: 'some_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}

app.use(session ({
    ...options,
}));*/

app.use(passport.initialize());
app.use(passport.session());



// Authentication route
app.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ['profile', 'email'],
    })
  );
  
app.get(
    "/auth/google/redirect",
    passport.authenticate('google'), (req: any, res: any) => {
        res.redirect("http://localhost:3000/")
    }
)

app.get('/logout', (req:any, res:any) => {
    req.logout()
})

const server = new ApolloServer({
    resolvers,
    typeDefs: typedefs,
    context: ({req} : {req: any}) => {
        return {
            getUser: () => req.user || getUserById('117964674981386088418'),
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
