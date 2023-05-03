import { MemberDB } from "../database/models/MemberDB"
import { IMember, Member } from "../entities/Member"
import { ISchedule } from "../entities/Schedule"

export class MemberRepository 
{
    async create(member: IMember) {
        const memberDB = new MemberDB()
        Object.assign(memberDB, member)
        const created_memberDB = await memberDB.save()
        const created_member_interface = created_memberDB as IMember
        const created_member = Member.fromInterface(created_member_interface)
        return created_member
    }
    
    async get(filter?: Partial<IMember>) {
        const membersDB = await MemberDB.find(filter)
        const members = membersDB.map(memberDB => {
            const member_interface = memberDB as IMember
            const member = Member.fromInterface(member_interface)
            return member
        })
        return members
    }

    async update(id: string, member: { name?: string, desired_schedule?: ISchedule, actual_schedule?: ISchedule }) {
        await MemberDB.updateOne({ id }, member)
        return this.get({ id })
    }

    async delete(filter?: Partial<IMember>) {
        await MemberDB.deleteMany(filter)
        return true
    }
}