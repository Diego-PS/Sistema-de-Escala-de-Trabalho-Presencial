import { Schema, model } from 'mongoose'
import { userSchema } from './UserDB'
import { IBoss } from '../../entities/Boss'


export const bossSchema = new Schema<IBoss>({
    id: { type: String, unique: true, required: true },
    organization_name: { type: String, unique: true, required: true },
    organization_rules: { type: Object, required: true }
})

export const BossDB = model<IBoss>('Boss', bossSchema)
