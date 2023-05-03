import { TeamLeaderDB } from "../database/models/TeamLeaderDB"
import { IRules } from "../entities/Rules"
import { ITeamLeader, TeamLeader } from "../entities/TeamLeader"

export class TeamLeaderRepository 
{
    async create(team_leader: ITeamLeader) {
        const team_leaderDB = new TeamLeaderDB()
        Object.assign(team_leaderDB, team_leader)
        const created_team_leaderDB = await team_leaderDB.save()
        const created_team_leader_interface = created_team_leaderDB as ITeamLeader
        const created_team_leader = TeamLeader.fromInterface(created_team_leader_interface)
        return created_team_leader
    }
    
    async get(filter?: Partial<ITeamLeader>) {
        const team_leaderesDB = await TeamLeaderDB.find(filter)
        const team_leaderes = team_leaderesDB.map(team_leaderDB => {
            const team_leader_interface = team_leaderDB as ITeamLeader
            const team_leader = TeamLeader.fromInterface(team_leader_interface)
            return team_leader
        })
        return team_leaderes
    }

    async update(id: string, team_leader: { name?: string, team_rules?: IRules }) {
        await TeamLeaderDB.updateOne({ id }, team_leader)
        return this.get({ id })
    }

    async delete(filter?: Partial<ITeamLeader>) {
        await TeamLeaderDB.deleteMany(filter)
        return true
    }
}