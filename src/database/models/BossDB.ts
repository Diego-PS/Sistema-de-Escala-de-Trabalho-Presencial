import mongoose, { Schema, model } from 'mongoose'
import { userSchema } from './UserDB'
import { IBoss } from '../../entities/Boss'


export const bossSchema = new Schema<IBoss>({
    ...userSchema.obj,
    organization_name: { type: String, unique: true, required: true },
    moa: { type: Number, required: true },
    mpw: { type: Number, required: true }
})

export const BossDB = mongoose.model('Boss', bossSchema)
