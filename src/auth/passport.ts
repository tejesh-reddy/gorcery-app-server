import { userAccess } from "../data";
import { getUserById } from "../service/UserService";
import { validatePassword } from "./password";
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



passport.use(
    new LocalStrategy((username: any, password:any, callback:any) => {
        userAccess.getByUsername(username)
        .then((user:any) => {
            if(!user.id) {
                return callback(null, false);
            }

            console.log(user);

            validatePassword(password, user.passwordHash)
            .then(match => {
                if(match) {
                    callback(null, user);
                }
                else {
                    callback(null, false);
                }
            })
        })
        .catch(err => callback(err));
    })
);

passport.serializeUser((user: any, callback: any) => {
    callback(null, user.id);
})

passport.deserializeUser((user: any, callback: any) => {
    getUserById(user)
    .then((user: any) => {
        if(!user.id) {
            callback(new Error("Bad ID"));
        }
        else {
            callback(null, user);
        }
    })
});

export { passport };