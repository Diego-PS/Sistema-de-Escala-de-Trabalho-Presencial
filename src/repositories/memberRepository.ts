import { MemberDB } from "../database/models/MemberDB"
import { IMember } from "../entities/Member"
import { IRepository } from "./IRepository"

export class MemberRepository implements IRepository<IMember>
{
    async create(member: IMember) {
        const memberDB = new MemberDB()
        Object.assign(memberDB, member)
        const created_memberDB = await memberDB.save()
        const created_member_interface = created_memberDB as IMember
        console.log(created_member_interface)
        return created_member_interface
    }
    
    async get(filter?: Partial<IMember>) {
        const membersDB = await MemberDB.find(filter)
        const members_interface = membersDB as IMember[]
        return members_interface
    }

    async update(id: string, member: Partial<IMember>) {
        await MemberDB.updateOne({ id }, member)
        return this.get({ id })[0]
    }

    async delete(filter?: Partial<IMember>) {
        await MemberDB.deleteMany(filter)
        return true
    }
}