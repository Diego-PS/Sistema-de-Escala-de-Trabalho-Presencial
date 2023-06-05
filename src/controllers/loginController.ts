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
    
            const secret = process.env.SECRET
    
            const token = jwt.sign({
                role: user.role,
                id: user.id
            }, secret)

            res.cookie("token" , token, {
                httpOnly: false,
            })
    
            if(user.role == "boss"){
                return res.status(200).json({ isError: false, msg: "Authentication was successful", url: '/equipes_regras.html' })
            }
            if(user.role == "team_leader"){
                return res.status(200).json({ isError: false, msg: "Authentication was successful", url: '/gerencia.html' })
            }
            if(user.role == "member"){
                return res.status(200).json({ isError: false, msg: "Authentication was successful", url: '/visu-e-pref.html' })
            }
            
            // res.status(200).json({ msg: "Authentication was successful", token , id })
        } catch(err) {
            return res.status(500).json({ msg: err?.message ?? 'Something went wrong' })
        }
    }

}