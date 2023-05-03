// import { MemberDB } from "../database/models/MemberDB"
// import { IMember, Member } from "../entities/Member"

// export class MemberRepository 
// {
//     async create(member: Member) {
//         const memberDB = new MemberDB()
//         Object.assign(memberDB, member)
//         const created_member = await memberDB.save()
//         return created_member as IMember as Member
//     }
    
//     async get(filter?: Partial<Member>) {
//         const members = await MemberDB.find(filter)
//         return members as IMember[] as Member[]
//     }

//     async update(id: string, member: Partial<Pick<Member, 'name' | 'desired_schedule' | 'actual_schedule'>>) {
//         const updated_member = await MemberDB.updateOne({ id }, member)
//         return this.get({ id })
//     }

//     async delete(filter?: Partial<Member>) {
//         await MemberDB.deleteMany(filter)
//         return true
//     }
// }