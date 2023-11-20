import JWT from 'passport-jwt'
import User from '../models/user.js';

import { JWT_SECRET } from './serverConfig.js';


const JwtStragegy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
};


export const passportAuth = (passport) => {
    try {
        passport.use(new JwtStragegy(opts, async (jwt_payload, done) => {
            const user = await User.findById(jwt_payload.id);
            if(!user){
                done(null, false);
            } else{
                done (null, user);
            }
        }))
    } catch (error) {
        throw new Error("Bad Requrest");
    }
}