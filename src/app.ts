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
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });


app.get('/login.html', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'/../frontend/html/login.html'))
})

app.get('/equipes_regras.html', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'/../frontend/html/dono-organizacao/equipes_regras.html'))
})

app.get('/equipes_regras.css', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'../../frontend/css/dono-organizacao/equipes_regras.css'))
})

app.get('/equipes_regras.js', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'../../frontend/js/dono-organizacao/equipes_regras.js'))
})

app.get('/logo_1.png', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'../../frontend/imgs/logo_1.png'))
})

app.get('/logo.png', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'../../frontend/imgs/logo.png'))
})

app.get('/login_bg_img.png', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'../../frontend/imgs/login_bg_img.png'))
})

//------------------------------------------------------------

app.get('/gerencia.html', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'/../frontend/html/chefe-equipe/gerencia.html'))
})

app.get('/gerencia.js', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'/../frontend/js/chefe-equipe/gerencia.js'))
})

//------------------------------------------------------------

app.get('/visualizacao.html', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'/../frontend/html/chefe-equipe/visualizacao.html'))
})

app.get('/visualizacao.js', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'/../frontend/js/chefe-equipe/visualizacao.js'))
})

app.get('/visualizacao.css', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'../../frontend/css/chefe-equipe/visualizacao.css'))
})

//------------------------------------------------------------

app.get('/visu-e-pref.html', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'/../frontend/html/membro/visu-e-pref.html'))
})

app.get('/visu-e-pref.html.js', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'/../frontend/js/membro/visu-e-pref.html.js'))
})

app.get('/visu-e-pref.css', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'../../frontend/css/membro/visu-e-pref.css'))
})

//------------------------------------------------------------

app.use(router)

export { app }