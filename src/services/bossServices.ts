import { teamLeaderServices } from "."
import { Boss, IBoss, IExParamsBoss } from "../entities/Boss"
import { TeamLeader } from "../entities/TeamLeader"
import { User } from "../entities/User"
import { IRepository } from "../repositories/IRepository"
import { IServices } from "./IServices"
import { userServices } from "./userServices"

export interface IBossServices extends IServices<IBoss, IExParamsBoss, Boss>
{
    getTeamLeaders: (id: string) => Promise<TeamLeader[]>
}

export class BossServices implements IBossServices
{
    constructor(public repository: IRepository<IBoss, IExParamsBoss>) {}

    async create(boss: Boss) {
        const boss_user_interface = boss.toUserInterface()
        const boss_user = User.fromInterface(boss_user_interface)
        await userServices.create(boss_user)
        
        const boss_interface = boss.toInterface()
        this.repository.create(boss_interface)
    }

    async get(filter?: Partial<IBoss>) {
        const bosses_ex_params_interface = await this.repository.get(filter)
        const boss_ids = bosses_ex_params_interface.map(boss_ex_params_interface => boss_ex_params_interface.id)
        const users = await userServices.getByIds(boss_ids)
        const bosses = bosses_ex_params_interface.map((boss_ex_params_interface, index) => Boss.fromInterface({ 
            ...users[index].toInterface(), 
            organization_name: boss_ex_params_interface.organization_name,
            organization_rules: boss_ex_params_interface.organization_rules
        }))
        return bosses
    }

    async getAll() {
        const bosses = await this.get()
        return bosses
    }

    async getById(id: string) {
        const boss = (await this.get({ id }))[0]
        return boss
    }

    async getByUsername(username: string) {
        const boss = (await this.get({ username }))[0]
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
        ids.forEach(async id => await this.deleteById(id))
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
}