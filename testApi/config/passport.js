const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config()

const User = require('../models/user');

module.exports = (passport) => {
    let params = {
        secretOrKey: process.env.ACCESS_TOKEN_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }
    
    passport.use(new JwtStrategy(params, (jwt_payload,next) => {
        let userName = jwt_payload.username;
        User.findOne({username:userName}, (err, user) => {
            if (err) {
                return next(err, false);
            }
            if (user)  {
                return next(null, user);
            }
            return next(null, false);
        })
    }))
}