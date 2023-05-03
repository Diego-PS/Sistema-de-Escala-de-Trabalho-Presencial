import { TeamLeaderDB } from "../database/models/TeamLeaderDB"
import { ITeamLeader, TeamLeader } from "../entities/TeamLeader"

export class TeamLeaderRepository 
{
    async create(team_leader: TeamLeader) {
        const team_leaderDB = new TeamLeaderDB()
        Object.assign(team_leaderDB, team_leader)
        await team_leaderDB.save()
        return team_leader
    }
    
    async get(filter?: Partial<TeamLeader>) {
        const team_leaderesDB = await TeamLeaderDB.find(filter)
        const team_leaderes = team_leaderesDB.map(team_leaderDB => {
            const team_leader_interface = team_leaderDB as ITeamLeader
            const team_leader = new TeamLeader({
                name: team_leader_interface.name,
                username: team_leader_interface.username,
                password: team_leader_interface.password,
                team_name: team_leader_interface.team_name,
                boss_id: team_leader_interface.boss_id,
                moa: team_leader_interface.moa,
                mpw: team_leader_interface.mpw
            }, team_leader_interface.id)
            return team_leader
        })
        return team_leaderes
    }

    async update(id: string, team_leader: Partial<Pick<TeamLeader, 'name' | 'moa' | 'mpw'>>) {
        await TeamLeaderDB.updateOne({ id }, team_leader)
        return this.get({ id })
    }

    async delete(filter?: Partial<TeamLeader>) {
        await TeamLeaderDB.deleteMany(filter)
        return true
    }
}