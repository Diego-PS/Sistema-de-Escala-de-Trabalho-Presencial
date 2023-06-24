import { app } from "./app";
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

mongoose
    .connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@smartshift.lmmto2b.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(4000, () => console.log("Rodando na porta 4000..."))
        console.log('Conectou ao banco!')
    })
    .catch((err) => console.log(err))