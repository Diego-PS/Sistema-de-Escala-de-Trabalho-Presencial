import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import express from 'express'
import { router } from './routes'
import { User } from "./entities/User";
import jwt from "jsonwebtoken";
import path from "path";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"


const app = express()

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser())

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
    res.sendFile(path.join(__dirname+'../../teste/style.css'))
})

app.get('/scripts.js', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'../../scripts.js'))
})

app.get('/login.html', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'/../frontend/html/login.html'))
})

app.get('/equipes_regras.css', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'../../frontend/css/dono-organizacao/equipes_regras.css'))
})



app.use(router)

export { app }