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

app.get('/', (req, res) => {
    res.redirect('/login.html')
})

/*------------------------------------------------------------
.css compartilhados por mais de um html
------------------------------------------------------------*/

app.get('/_fillers.css', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '../../frontend/css/_shared/_fillers.css'))
})

app.get('/_variables.css', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '../../frontend/css/_shared/_variables.css'))
})

app.get('/_postLogin.css', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '../../frontend/css/_shared/_postLogin.css'))
})

app.get('/_matrixes.css', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '../../frontend/css/_shared/_matrixes.css'))
})

app.get('/_cards_buttons.css', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '../../frontend/css/_shared/_cards_buttons.css'))
})

/*------------------------------------------------------------
------------------------------------------------------------*/

app.get('/equipes_regras.js', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '../../frontend/js/dono-organizacao/equipes_regras.js'))
})

app.get('/equipes_regras.html', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/../frontend/html/dono-organizacao/equipes_regras.html'))
})

app.get('/equipes_regras.css', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/../frontend/css/dono-organizacao/equipes_regras.css'))
})

/*------------------------------------------------------------
------------------------------------------------------------*/


app.get('/login.html', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/../frontend/html/login.html'))
})

app.get('/login.css', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/../frontend/css/login.css'))
})

app.get('/login.js', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/../frontend/js/login.js'))
})

/*------------------------------------------------------------
------------------------------------------------------------*/


app.get('/cadastro.html', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/../frontend/html/cadastro.html'))
})

app.get('/cadastro.css', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/../frontend/css/cadastro.css'))
})

app.get('/cadastro.js', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/../frontend/js/cadastro.js'))
})


/*------------------------------------------------------------
------------------------------------------------------------*/

app.get('/logo_1.png', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '../../frontend/imgs/logo_1.png'))
})

app.get('/logo.png', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '../../frontend/imgs/logo.png'))
})

app.get('/logo_trans.png', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '../../frontend/imgs/logo_trans.png'))
})

app.get('/login_bg_img.png', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '../../frontend/imgs/login_bg_img.png'))
})

//------------------------------------------------------------

app.get('/gerencia.html', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/../frontend/html/chefe-equipe/gerencia.html'))
})

app.get('/gerencia.js', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/../frontend/js/chefe-equipe/gerencia.js'))
})

app.get('/gerencia.css', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/../frontend/css/chefe-equipe/gerencia.css'))
})

//------------------------------------------------------------

app.get('/visualizacao.html', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/../frontend/html/chefe-equipe/visualizacao.html'))
})

app.get('/visualizacao.js', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/../frontend/js/chefe-equipe/visualizacao.js'))
})

app.get('/visualizacao.css', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '../../frontend/css/chefe-equipe/visualizacao.css'))
})

//------------------------------------------------------------

app.get('/visu-e-pref.html', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/../frontend/html/membro/visu-e-pref.html'))
})

app.get('/visu-e-pref.css', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '../../frontend/css/membro/visu-e-pref.css'))
})

app.get('/visu-e-pref.js', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/../frontend/js/membro/visu-e-pref.js'))
})

//------------------------------------------------------------

app.get('/delete.html', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/../frontend/html/delete.html'))
})

app.get('/delete.js', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/../frontend/js/delete.js'))
})

app.use(router)

export { app }