import {Strategy, ExtractJwt} from 'passport-jwt'
//const Strategy=require('passport-jwt').Strategy
//const ExtractJwt=require('passport-jwt').ExtractJwt
import { setings } from '../config/keys'
import mongoose = require("mongoose")
const User = mongoose.model('users')
const options = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: setings.jwt_s 
}

async function passportfun(passport) {
    passport.use(
        new Strategy(options, async (payload, done) => {
            try {
                const user = await User.findById(payload.userId).select('email id')
                if (user) {
                    done(null, user)
                }
                else {
                    done(null, false)
                }
            } catch (e) {
                console.log(e)
            }
        }))
}

export {passportfun}