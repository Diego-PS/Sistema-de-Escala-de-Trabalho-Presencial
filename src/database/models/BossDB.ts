import { Schema, model } from 'mongoose'
import { userSchema } from './UserDB'
import { IBoss } from '../../entities/Boss'
import { Rules } from '../../entities/Rules'


export const bossSchema = new Schema<IBoss>({
    ...userSchema.obj,
    organization_name: { type: String, unique: true, required: true },
    organization_rules: { type: Rules, required: true }
})

export const BossDB = model<IBoss>('Boss', bossSchema)
