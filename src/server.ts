import { app } from "./app";
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

// teste
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem-vindo à nossa API!' })
})

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPass}@smartshift.lmmto2b.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(4000, () => console.log("Rodando na porta 4000..."))
        console.log('Conectou ao banco!')
    })
    .catch((err) => console.log(err))