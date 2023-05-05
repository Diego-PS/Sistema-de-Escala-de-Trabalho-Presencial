import { TeamLeaderDB } from "../database/models/TeamLeaderDB"
import { IExParamsTeamLeader, ITeamLeader } from "../entities/TeamLeader"
import { IRepository } from "./IRepository"

export class TeamLeaderRepository implements IRepository<ITeamLeader, IExParamsTeamLeader>
{
    async create(team_leader: ITeamLeader) {
        const team_leaderDB = new TeamLeaderDB()
        Object.assign(team_leaderDB, team_leader)
        await team_leaderDB.save()
        return team_leader
    }
    
    async get(filter?: Partial<ITeamLeader>) {
        const team_leadersDB = await TeamLeaderDB.find(filter)
        const team_leaders_interface = team_leadersDB as IExParamsTeamLeader[]
        return team_leaders_interface
    }

    async getByIds(ids: string[]) {
        const team_leaders_DB = await TeamLeaderDB.find({ id: { $in: ids } })
        const team_leaders_interface = team_leaders_DB as IExParamsTeamLeader[]
        return team_leaders_interface
    }

    async update(id: string, team_leader: Partial<ITeamLeader>) {
        await TeamLeaderDB.updateOne({ id }, team_leader)
        return this.get({ id })[0]
    }

    async delete(filter?: Partial<ITeamLeader>) {
        await TeamLeaderDB.deleteMany(filter)
    }

    async deleteByIds(ids: string[]) {
        await TeamLeaderDB.deleteMany({ id: { $in: ids } })
    }
}