import { userAccess } from "../data";
import { addUser, getUserById } from "../service/UserService";
import { validatePassword } from "./password";
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;



passport.use(
    new GoogleStrategy(
        {
            clientID: "670811861462-kohvbhe437a8hspoqgomeh9n62p1tne1.apps.googleusercontent.com",
            clientSecret: "NDaNtnN-8OwyyIoeFtYrisdt",
            callbackURL: "/auth/google/redirect",
        },
        (accessToken:any, refreshToken:any, email:any, done:any) => {
            console.log('access token:', accessToken)
            console.log('email:', email.id, email.displayName, email.emails[0].value)
            const userId = email.id;
            const username = email.displayName;
            const emailId = email.emails[0].value;
            getUserById(userId)
            .then((user: any) => {
                if(!user.id) {
                    addUser(userId, username, emailId)
                    .then(newUser => done(null, newUser))
                }
                else {
                    done(null, user)
                }
            })
        }
    )
);

passport.serializeUser((user: any, callback: any) => {
    console.log('-----', user, user.id)
    callback(null, user.id);
})

passport.deserializeUser((userId: any, callback: any) => {
    getUserById(userId)
    .then((user: any) => {
        if(!user.id) {
            console.log(user, userId)
            callback(new Error("Bad ID"));
        }
        else {
            callback(null, user);
        }
    })
});

export { passport };