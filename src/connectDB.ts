import dotenv from 'dotenv'
import mongoose from "mongoose"

export const connectDB = () => {
    dotenv.config()
    return mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@smartshift.lmmto2b.mongodb.net/?retryWrites=true&w=majority`)
}

export const disconnectDB = () => {
    return mongoose.disconnect()
}