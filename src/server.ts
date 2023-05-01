import { app } from "./app";
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserDB, userSchema } from "./database/models/UserDB";
import { User } from "./entities/User";

dotenv.config()

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem-vindo à nossa API!' })
})

// Register User
app.post('/auth/register', async(req, res) => {
    // public name: string
    // public username: string
    // public password: string
    // public role: string
    const { name, username, password, confirmpassword, role } = req.body

    // validations
    if (!name) {
        return res.status(422).json({ msg: 'O nome é obrigatório!' })
    }
    if (!username) {
        return res.status(422).json({ msg: 'O username é obrigatório!' })
    }
    if (!password) {
        return res.status(422).json({ msg: 'O password é obrigatório!' })
    }
    if (!confirmpassword) {
        return res.status(422).json({ msg: 'O confirmpassword é obrigatório!' })
    }
    if (!role) {
        return res.status(422).json({ msg: 'O role é obrigatório!' })
    }
    if (password != confirmpassword) {
        return res.status(422).json({ msg: 'As senhas não conferem' })
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({ name, username, password: passwordHash, role })

    const userDB = new UserDB({
        id: user.id,
        name,
        username,
        password: passwordHash,
        role
    })

    try {
        await userDB.save()
        res.status(201).json({msg: 'Usuársio cadastrado com sucesso'})
    } catch(err) {
        res.status(500).json({msg: err})
    }
})

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPass}@smartshiftdb.aixb2uu.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3333, () => console.log("Rodando na porta 3333"))
        console.log('Conectou ao banco!')
    })
    .catch((err) => console.log(err))