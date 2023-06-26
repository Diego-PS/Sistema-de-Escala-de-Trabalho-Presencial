import dotenv from 'dotenv'
import mongoose from "mongoose"
import { UserDB } from './database/models/UserDB'
import { BossDB } from './database/models/BossDB'
import { TeamLeaderDB } from './database/models/TeamLeaderDB'
import { MemberDB } from './database/models/MemberDB'

export const connectDB = () => {
    dotenv.config()
    return mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@smartshift.lmmto2b.mongodb.net/?retryWrites=true&w=majority`)
}

export const cleanDB = async () => {
    await UserDB.deleteMany()
    await BossDB.deleteMany()
    await TeamLeaderDB.deleteMany()
    await MemberDB.deleteMany()
}

export const disconnectDB = () => {
    return mongoose.disconnect()
}