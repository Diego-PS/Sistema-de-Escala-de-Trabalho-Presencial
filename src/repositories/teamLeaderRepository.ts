import { TeamLeaderDB } from "../database/models/TeamLeaderDB"
import { ITeamLeader, TeamLeader } from "../entities/TeamLeader"
import { IRepository } from "./IRepository"

export class TeamLeaderRepository implements IRepository<ITeamLeader>
{
    async create(team_leader: ITeamLeader) {
        const team_leaderDB = new TeamLeaderDB()
        Object.assign(team_leaderDB, team_leader)
        const created_team_leaderDB = await team_leaderDB.save()
        const created_team_leader_interface = created_team_leaderDB as ITeamLeader
        return created_team_leader_interface
    }
    
    async get(filter?: Partial<ITeamLeader>) {
        const team_leaderesDB = await TeamLeaderDB.find(filter)
        const team_leaderes_interface = team_leaderesDB as ITeamLeader[]
        return team_leaderes_interface
    }

    async update(id: string, team_leader: Partial<ITeamLeader>) {
        await TeamLeaderDB.updateOne({ id }, team_leader)
        return this.get({ id })[0]
    }

    async delete(filter?: Partial<ITeamLeader>) {
        await TeamLeaderDB.deleteMany(filter)
        return true
    }
}