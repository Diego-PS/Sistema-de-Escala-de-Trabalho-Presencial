import { bossServices, memberServices } from "."
import { IRules, Rules } from "../abstractions/Rules"
import { Boss } from "../entities/Boss"
import { Member } from "../entities/Member"
import { IExParamsTeamLeader, ITeamLeader, TeamLeader } from "../entities/TeamLeader"
import { User } from "../entities/User"
import { IRepository } from "../repositories/IRepository"
import { IServices } from "./IServices"
import { userServices } from "./userServices"

export interface ITeamLeaderServices extends IServices<ITeamLeader, IExParamsTeamLeader, TeamLeader>
{
    getTeamMembers: (id: string) => Promise<Member[]>
    getBoss: (id: string) => Promise<Boss>
    changeTeamRules: (id: string, new_rules: IRules) => Promise<void>
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

    async delete(filter?: Partial<ITeamLeader>) {
        const get_teams = await this.repository.get(filter)
        const ids = get_teams.map(team => team.id)
        ids.forEach(async id => await this.deleteById(id))
    }

    async deleteById(id: string) {
        await memberServices.delete({ team_leader_id: id })
        await this.repository.delete({ id })
        await userServices.deleteById(id)
    }
    
    async deleteByUsername(username: string) {
        await memberServices.delete({ team_leader_id: username })
        await this.repository.delete({ username })
        await userServices.deleteByUsername(username)
    }

    async getTeamMembers(id: string) {
        const members = await memberServices.get({ team_leader_id: id })
        return members
    }

    async getBoss(id: string) {
        const team_leader = await this.getById(id)
        const boss = await bossServices.getById(team_leader.boss_id)
        return boss
    }

    async changeTeamRules(id: string, new_rules: IRules) {
        const new_rules_object = new Rules(new_rules)
        const boss = await this.getBoss(id)
        if (!new_rules_object.satisfies(boss.organization_rules)) {
            throw new Error('Team rules must satisfy organization rules')
        }
        await this.update(id, { team_rules: new_rules })
    }
}