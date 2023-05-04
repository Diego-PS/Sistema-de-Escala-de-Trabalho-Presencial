import { memberServices } from "."
import { Member } from "../entities/Member"
import { IExParamsTeamLeader, ITeamLeader, TeamLeader } from "../entities/TeamLeader"
import { User } from "../entities/User"
import { IRepository } from "../repositories/IRepository"
import { IServices } from "./IServices"
import { userServices } from "./userServices"

export interface ITeamLeaderServices extends IServices<ITeamLeader, IExParamsTeamLeader, TeamLeader>
{
    getTeamMembers: (id: string) => Promise<Member[]>
}

export class TeamLeaderServices implements ITeamLeaderServices
{
    constructor(public repository: IRepository<ITeamLeader, IExParamsTeamLeader>) {}

    async create(team_leader: TeamLeader) {
        const team_leader_user_interface = team_leader.toUserInterface()
        const team_leader_user = User.fromInterface(team_leader_user_interface)
        await userServices.create(team_leader_user)
        
        const team_leader_interface = team_leader.toInterface()
        this.repository.create(team_leader_interface)
    }

    async get(filter?: Partial<ITeamLeader>) {
        const team_leaders_ex_params_interface = await this.repository.get(filter)
        const team_leader_ids = team_leaders_ex_params_interface.map(team_leader_ex_params_interface => team_leader_ex_params_interface.id)
        const users = await userServices.getByIds(team_leader_ids)
        const team_leaders = team_leaders_ex_params_interface.map((team_leader_ex_params_interface, index) => TeamLeader.fromInterface({ 
            ...users[index].toInterface(), 
            boss_id: team_leader_ex_params_interface.boss_id,
            team_name: team_leader_ex_params_interface.team_name,
            team_rules: team_leader_ex_params_interface.team_rules
        }))
        return team_leaders
    }

    async getAll() {
        const team_leaders = await this.get()
        return team_leaders
    }

    async getById(id: string) {
        const team_leader = (await this.get({ id }))[0]
        return team_leader
    }

    async getByUsername(username: string) {
        const team_leader = (await this.get({ username }))[0]
        return team_leader
    }

    async update(id: string, team_leader: Partial<ITeamLeader>) {
        await this.repository.update(id, team_leader)
        await userServices.update(id, team_leader)
        const updated_team_member = await this.getById(id)
        return updated_team_member
    }

    async deleteById(id: string) {
        await this.repository.delete({ id })
        await userServices.deleteById(id)
    }

    async deleteByUsername(username: string) {
        await this.repository.delete({ username })
        await userServices.deleteByUsername(username)
    }

    async getTeamMembers(id: string) {
        const members = await memberServices.get({ team_leader_id: id })
        return members
    }
}