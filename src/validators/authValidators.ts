import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export class AuthValidators 
{
    login(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body

        if (!username) {
            return res.status(422).json({ msg: 'The username is mandatory' })
        }

        if (!password) {
            return res.status(422).json({ msg: 'The password is mandatory' })
        }

        next()
    }

    auth(req: Request, res: Response, next: NextFunction) {

        const token = req.cookies.token

        //const authHeader = req.headers['authorization']
        //const token = authHeader && authHeader.split(" ")[1]
    
        if (!token) {
            return res.status(401).json({ msg: "Access denied" })
        }
    
        try {
    
            const secret = process.env.SECRET
    
            const { role } = jwt.verify(token, secret)
    
            req.params.role = role
            next()
    
        } catch(err) {
            res.status(400).json({ msg: 'Invalid token' })
        }
    }

    boss(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.params.role === 'boss') {
                next()
            } else {
                res.status(401).json({ msg: 'not allowed' })
            }
        } catch (err) {
            res.status(401).json({ msg: 'boss authentication failed' })
        }
    }

    teamLeader(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.params.role === 'team_leader') {
                next()
            } else {
                res.status(401).json({ msg: 'not allowed' })
            }
        } catch (err) {
            res.status(401).json({ msg: 'team leader authentication failed' })
        }
    }

    member(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.params.role === 'member') {
                next()
            } else {
                res.status(401).json({ msg: 'not allowed' })
            }
        } catch (err) {
            res.status(401).json({ msg: 'member authentication failed' })
        }
    }
}