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
        const member_ids = members_ex_params_interface.map(member_ex_params_interface => member_ex_params_interface.id)
        const users = await userServices.getByIds(member_ids)
        const members = members_ex_params_interface.map((member_ex_params_interface, index) => Member.fromInterface({ 
            ...users[index].toInterface(), 
            team_leader_id: member_ex_params_interface.team_leader_id,
            desired_schedule: member_ex_params_interface.desired_schedule,
            actual_schedule: member_ex_params_interface.actual_schedule 
        }))
        return members
    }

    async getAll() {
        const users = await this.get()
        return users
    }

    async getById(id: string) {
        const user = (await this.get({ id }))[0]
        return user
    }

    async getByUsername(username: string) {
        const user = (await this.get({ username }))[0]
        return user
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