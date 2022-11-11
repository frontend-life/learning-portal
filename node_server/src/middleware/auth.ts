import { Request as Req, Response as Res, NextFunction as Next } from 'express';

import { User } from './../models/user';
import { decodeAuthToken } from '../service/auth';

export const auth = async (req: Req, res: Res, next: Next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if(!token) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        const userId = decodeAuthToken(token);
        const user = await User.findById(userId);
        if(!user) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({error: "Wrong token!"});
    }
}