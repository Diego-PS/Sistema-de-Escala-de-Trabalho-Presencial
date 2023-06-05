import { app } from "./app";
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const databaseConnection = process.env.DB_CONNECTION_TEST

mongoose
    .connect(databaseConnection)
    .then(() => {
        app.listen(4000, () => console.log("Rodando na porta 4000..."))
        console.log('Conectou ao banco!')
    })
    .catch((err) => console.log(err))