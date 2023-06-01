import { Request, Response } from "express";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export class LoginController 
{
    async login(req: Request, res: Response) {
        const { username, password } = req.body
        try {
            // check if user existis
            const user = await User.getByUsername(username)
            if (!user) {
                return res.status(422).json({ msg: 'User does not exist' })
            }
    
            // check if password match
            const checkPassorwd = await bcrypt.compare(password, user.password)
    
            if (!checkPassorwd) {
                return res.status(422).json({ msg: 'Invalid password' })
            }

            const id = user.id
    
            const secret = process.env.SECRET
    
            const token = jwt.sign({
                role: user.role
            }, secret)

            res.cookie("token" , token, {
                httpOnly: true,
            })
    
            res.redirect('/equipes_regras.html')
            // res.status(200).json({ msg: "Authentication was successful", token , id })
        } catch(err) {
            return res.status(500).json({ msg: err?.message ?? 'Something went wrong' })
        }
    }

}