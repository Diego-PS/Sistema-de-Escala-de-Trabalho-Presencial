import { teamLeaderServices } from "."
import { IRules, Rules } from "../abstractions/Rules"
import { Boss, IBoss, IExParamsBoss } from "../entities/Boss"
import { TeamLeader } from "../entities/TeamLeader"
import { User } from "../entities/User"
import { IRepository } from "../repositories/IRepository"
import { IServices } from "./IServices"
import { userServices } from "./userServices"
import bcrypt from "bcrypt"

export interface IBossServices extends IServices<IBoss, IExParamsBoss, Boss>
{
    getTeamLeaders: (id: string) => Promise<TeamLeader[]>
    changeOrganizationRules: (id: string, new_rules: IRules) => Promise<void>
}

export class BossServices implements IBossServices
{
    constructor(public repository: IRepository<IBoss, IExParamsBoss>) {}

    async create(boss: Boss) {
        
        // generate hashed password
        const salt = await bcrypt.genSalt(5)
        const passwordHash = await bcrypt.hash(boss.password, salt)
        boss.password = passwordHash

        // check if username is already in use
        if (await User.getByUsername(boss.username)) {
            throw new Error('This username is already in use')
        }

        const boss_user_interface = boss.toUserInterface()
        const boss_user = User.fromInterface(boss_user_interface)
        await userServices.create(boss_user)
        
        const boss_interface = boss.toInterface()
        this.repository.create(boss_interface)
    }

    async get(filter?: Partial<IBoss>) {
        const bosses_ex_params_interface = await this.repository.get(filter)
        const map_to_ex_params_interface = bosses_ex_params_interface.reduce((acc, ex_params_interface) => { acc[ex_params_interface.id] = ex_params_interface; return acc }, {})
        const boss_ids = bosses_ex_params_interface.map(boss_ex_params_interface => boss_ex_params_interface.id)
        const users = await userServices.getByIds(boss_ids)
        const map_to_users = users.reduce((acc, user) => { acc[user.id] = user; return acc }, {})
        const bosses = boss_ids.map((id) => Boss.fromInterface({ 
            ...map_to_users[id].toInterface(), 
            organization_name: map_to_ex_params_interface[id].organization_name,
            organization_rules: map_to_ex_params_interface[id].organization_rules,
        }))
        return bosses
    }

    async getAll() {
        const bosses = await this.get()
        return bosses
    }

    async getById(id: string) {
        const boss_list = await this.get({ id })
        if (boss_list.length === 0) throw new Error(`No boss with id ${id} was found`)
        const boss = boss_list[0]
        return boss
    }

    async getByUsername(username: string) {
        const user = await userServices.getByUsername(username)
        if (user.role !== 'boss') throw new Error(`No boss with username ${username} was found`)
        const boss_list = await this.get({ id: user.id })
        if (boss_list.length === 0) throw new Error(`No boss with id ${user.id} was found`)
        const boss = boss_list[0]
        return boss
    }

    async update(id: string, boss: Partial<IBoss>) {
        await this.repository.update(id, boss)
        await userServices.update(id, boss)
        const updated_boss = await this.getById(id)
        return updated_boss
    }

    async delete(filter?: Partial<IBoss>) {
        const get_bosses = await this.repository.get(filter)
        const ids = get_bosses.map(boss => boss.id)
        for(const id of ids) await this.deleteById(id)
    }

    async deleteById(id: string) {
        await teamLeaderServices.delete({ boss_id: id })
        await this.repository.delete({ id })
        await userServices.deleteById(id)
    }

    async deleteByUsername(username: string) {
        await this.repository.delete({ username })
        await userServices.deleteByUsername(username)
    }

    async getTeamLeaders(id: string) {
        const team_leaders = await teamLeaderServices.get({ boss_id: id })
        return team_leaders
    }

    async changeOrganizationRules(id: string, new_rules: IRules) {
        const boss = await this.getById(id)
        const new_rules_object = new Rules(new_rules)
        this.update(id, { organization_rules: new_rules })

        const team_leaders = await this.getTeamLeaders(id)
        for (const team_leader of team_leaders) {
            if (!team_leader.team_rules.satisfies(boss.organization_rules)) {
                let moa = team_leader.team_rules.getMOA()
                let mpw = team_leader.team_rules.getMPW()
                if (moa < boss.organization_rules.getMOA()) {
                    moa = boss.organization_rules.getMOA()
                }
                if (mpw < boss.organization_rules.getMPW()) {
                    mpw = boss.organization_rules.getMPW()
                }
                await teamLeaderServices.changeTeamRules(team_leader.id, { moa, mpw })
            }
        }
    }
}