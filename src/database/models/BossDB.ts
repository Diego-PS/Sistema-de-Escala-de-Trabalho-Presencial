import mongoose, { Schema, model } from 'mongoose'
import { userSchema } from './UserDB'
import { IBoss } from '../../entities/Boss'


export const bossSchema = new Schema<IBoss>({
    ...userSchema.obj,
    organization_name: { type: String, unique: true, required: true },
    organization_rules: { type: Object, required: true }
})

export const BossDB = mongoose.model('Boss', bossSchema)
