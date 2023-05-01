import { Schema, model } from 'mongoose'
import { userSchema } from './UserDB'
import { IMember } from '../../entities/Member'
import { Schedule } from '../../entities/Schedule'


export const memberSchema = new Schema<IMember>({
    ...userSchema.obj,
    team_leader_id: { type: String, required: true },
    desired_schedule: { type: Schedule, required: true },
    actual_schedule: { type: Schedule, required: true }
})

export const MemberDB = model<IMember>('Member', memberSchema)

