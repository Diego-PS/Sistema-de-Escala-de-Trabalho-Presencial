import { MemberDB } from "../database/models/MemberDB"
import { IExParamsMember, IMember, Member } from "../entities/Member"
import { IRepository } from "./IRepository"

export class MemberRepository implements IRepository<IMember, IExParamsMember>
{
    async create(member: IMember) {
        const memberDB = new MemberDB()
        Object.assign(memberDB, member)
        await memberDB.save()
        return member
    }
    
    async get(filter?: Partial<IMember>) {
        const membersDB = await MemberDB.find(filter)
        const members_interface = membersDB as IExParamsMember[]
        return members_interface
    }

    async getByIds(ids: string[]) {
        const membersDB = await MemberDB.find({
            id: { $in: ids }
        })
        const members_interface = membersDB as IExParamsMember[]
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