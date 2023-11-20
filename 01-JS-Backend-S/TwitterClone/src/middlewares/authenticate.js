import passport from 'passport'

import { StatusCodes } from 'http-status-codes';
export const authenticate = (req, res, next)=>{
    passport.authenticate('jwt', (err, user, info)=>{
        if(err){
            return next(err)
        }
        if(!user){
            return res.status(StatusCodes.BAD_REQUEST).json(info.message)
        }
        req.user = user;
        next();
    })(req, res, next);
}