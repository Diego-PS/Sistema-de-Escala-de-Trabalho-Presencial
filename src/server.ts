import { app } from "./app";
import { connectDB } from "./connectDB";

connectDB().then(() => {
        app.listen(4000, () => console.log("Rodando na porta 4000..."))
        console.log('Conectou ao banco!')
    })
    .catch((err) => console.log(err))