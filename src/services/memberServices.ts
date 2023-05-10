import { IExParamsMember, IMember, Member } from "../entities/Member"
import { User } from "../entities/User"
import { IRepository } from "../repositories/IRepository"
import { IServices } from "./IServices"
import { userServices } from "./userServices"

export class MemberServices implements IServices<IMember, IExParamsMember, Member>
{
    constructor(public repository: IRepository<IMember, IExParamsMember>) {}

    async create(member: Member) {
        const member_user_interface = member.toUserInterface()
        const member_user = User.fromInterface(member_user_interface)
        await userServices.create(member_user)
        
        const member_interface = member.toInterface()
        this.repository.create(member_interface)
    }

    async get(filter?: Partial<IMember>) {
        const members_ex_params_interface = await this.repository.get(filter)
        const map_to_ex_params_interface = members_ex_params_interface.reduce((acc, ex_params_interface) => { acc[ex_params_interface.id] = ex_params_interface; return acc }, {})
        const member_ids = members_ex_params_interface.map(member_ex_params_interface => member_ex_params_interface.id)
        const users = await userServices.getByIds(member_ids)
        const map_to_users = users.reduce((acc, user) => { acc[user.id] = user; return acc }, {})
        const members = member_ids.map((id) => Member.fromInterface({ 
            ...map_to_users[id].toInterface(), 
            team_leader_id: map_to_ex_params_interface[id].team_leader_id,
            desired_schedule: map_to_ex_params_interface[id].desired_schedule,
            actual_schedule: map_to_ex_params_interface[id].actual_schedule
        }))
        return members
    }

    async getAll() {
        const users = await this.get()
        return users
    }

    async getById(id: string) {
        const member_list = await this.get({ id })
        if (member_list.length === 0) throw new Error(`No member with id ${id} was found`)
        const member = member_list[0]
        return member
    }

    async getByUsername(username: string) {
        const user = await userServices.getByUsername(username)
        if (user.role !== 'member') throw new Error(`No member with username ${username} was found`)
        const member_list = await this.get({ id: user.id })
        if (member_list.length === 0) throw new Error(`No member with id ${user.id} was found`)
        const member = member_list[0]
        return member
    }

    async update(id: string, member: Partial<IMember>) {
        await this.repository.update(id, member)
        await userServices.update(id, member)
        const updated_member = await this.getById(id)
        return updated_member
    }

    async delete(filter?: Partial<IMember>) {
        const get_members = await this.repository.get(filter)
        const ids = get_members.map(team => team.id)
        await this.repository.deleteByIds(ids)
        await userServices.deleteByIds(ids)
    }

    async deleteById(id: string) {
        await this.repository.delete({ id })
        await userServices.deleteById(id)
    }

    async deleteByUsername(username: string) {
        await this.repository.delete({ username })
        await userServices.deleteByUsername(username)
    }
}