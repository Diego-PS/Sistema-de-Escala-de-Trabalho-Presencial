import { UserDB } from "../database/models/UserDB";
import { IUser } from "../entities/User";
import { IRepository } from "./IRepository";

export class UserRepository implements IRepository<IUser, IUser>
{
    async create(user: IUser) {
        const userDB = new UserDB()
        Object.assign(userDB, user)
        const created_userDB = await userDB.save()
        const created_user_interface = created_userDB as IUser
        return created_user_interface
    }
    
    async get(filter?: Partial<IUser>) {
        const usersDB = await UserDB.find(filter)
        const users_interface = usersDB as IUser[]
        return users_interface
    }

    async getByIds(ids: string[]) {
        const usersDB = await UserDB.find({
            id: { $in: ids }
        })
        const users_interface = usersDB as IUser[]
        return users_interface
    }

    async update(id: string, user: Partial<IUser>) {
        await UserDB.updateOne({ id }, user)
        return this.get({ id })[0]
    }

    async delete(filter?: Partial<IUser>) {
        await UserDB.deleteMany(filter)
        return true
    }
}