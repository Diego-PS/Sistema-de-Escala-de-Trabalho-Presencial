import { Schema, model } from 'mongoose'
import { IUser } from '../../entities/User'


export const userSchema = new Schema<IUser>({
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
})

export const UserDB = model<IUser>('User', userSchema)