import { teamLeaderServices } from "."
import { ISchedule, Schedule } from "../abstractions/Schedule"
import { IExParamsMember, IMember, Member } from "../entities/Member"
import { User } from "../entities/User"
import { IRepository } from "../repositories/IRepository"
import { IServices } from "./IServices"
import { userServices } from "./userServices"
import bcrypt from "bcrypt";

export interface IMemberServices extends IServices<IMember, IExParamsMember, Member>
{
    changeDesiredSchedule: (id: string, new_schedule: ISchedule) => Promise<void>
}


export class MemberServices implements IMemberServices
{
    constructor(public repository: IRepository<IMember, IExParamsMember>) {}

    async create(member: Member) {
        
        // generate hashed password
        const salt = await bcrypt.genSalt(5)
        const passwordHash = await bcrypt.hash(member.password, salt)
        member.password = passwordHash

        // check if username is already in use
        if (await User.getByUsername(member.username)) {
            throw new Error('This username is already in use')
        }

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

    async changeDesiredSchedule(id: string, new_schedule: ISchedule) {
        const member = await this.getById(id)
        const team_leader = await teamLeaderServices.getById(member.team_leader_id)
        const new_schedule_obj = new Schedule(new_schedule)
        if (!new_schedule_obj.satisfies(team_leader.team_rules)) {
            throw new Error('The desired schedule does not satisty team rules')
        }
        await this.update(id, { desired_schedule: new_schedule })
    }
}