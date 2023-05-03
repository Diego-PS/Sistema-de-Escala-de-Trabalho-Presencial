import { Schema, model } from 'mongoose'
import { userSchema } from './UserDB'
import { ITeamLeader } from '../../entities/TeamLeader'


export const teamLeaderSchema = new Schema<ITeamLeader>({
    ...userSchema.obj,
    boss_id: { type: String, required: true },
    team_name: { type: String, required: true },
    team_rules: { type: Object, required: true }
})

export const TeamLeaderDB = model<ITeamLeader>('TeamLeader', teamLeaderSchema)

