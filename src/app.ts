import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import express from 'express'
import { router } from './routes'
import { User } from "./entities/User";
import jwt from "jsonwebtoken";
import path from "path";

const app = express()

app.use(express.json())

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.get('/teste.html', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'../../teste.html'))
})

app.get('/style.css', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'../../style.css'))
})

app.get('/scripts.js', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'../../scripts.js'))
})

// app.post('/auth/login', async (req: Request, res: Response) => {
//     const { username, password } = req.body

//     // validation 
//     if (!username) {
//         return res.status(422).json({ msg: 'O email é obrigatório!' })
//     }

//     if (!password) {
//         return res.status(422).json({ msg: 'A senha é obrigatória!' })
//     }
    
//     try {
//         // check if user existis
//         const user = await User.getByUsername(username)
//         if (!user) {
//             return res.status(422).json({ msg: 'User does not exist' })
//         }

//         // check if password match
//         const checkPassorwd = await bcrypt.compare(password, user.password)

//         if (!checkPassorwd) {
//             return res.status(422).json({ msg: 'Senha inválida!' })
//         }

//         const secret = process.env.SECRET

//         const token = jwt.sign({
//             id: user.id,
//             username: user.username,
//             role: user.role
//         }, secret)

//         res.status(200).json({ msg: "Authentication was successful", token })
//     } catch(err) {
//         return res.status(500).json({ msg: err?.message ?? 'Something went wrong' })
//     }
// })

// const boss = (req: Request, res: Response, next: NextFunction) => {
//     console.log('Passei do auth')
//     try {
//         if (req.body.role === 'boss') {
//             next()
//         } else {
//             res.status(401).json({ msg: 'not allowed' })
//         }
//     } catch (err) {
//         res.status(401).json({ msg: 'boss authentication failed' })
//     }
// }

// app.get("/user/:id", auth, boss, async (req: Request, res: Response) => {
    
//     const id = req.params.id

//     // check if user exists
//     const user = await User.getById(id)

//     if (!user) {
//         return res.status(404).json({ msg: 'User not found' })
//     }

//     res.status(200).json({ user })
// })

app.use(router)

export { app }