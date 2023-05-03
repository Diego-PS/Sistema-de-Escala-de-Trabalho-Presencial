import { Schema, model } from 'mongoose'
import { userSchema } from './UserDB'
import { IMember } from '../../entities/Member'


export const memberSchema = new Schema<IMember>({
    ...userSchema.obj,
    team_leader_id: { type: String, required: true },
    desired_mon:{ type: Boolean, required: true },
    desired_tue:{ type: Boolean, required: true },
    desired_wed:{ type: Boolean, required: true },
    desired_thu:{ type: Boolean, required: true },
    desired_fri:{ type: Boolean, required: true },
    actual_mon:{ type: Boolean, required: true },
    actual_tue:{ type: Boolean, required: true },
    actual_wed:{ type: Boolean, required: true },
    actual_thu:{ type: Boolean, required: true },
    actual_fri:{ type: Boolean, required: true }
})

export const MemberDB = model<IMember>('Member', memberSchema)

