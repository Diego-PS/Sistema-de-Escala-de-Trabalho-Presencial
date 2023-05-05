import { IUser, User } from "../entities/User"
import { userRepository } from "../repositories"
import { IRepository } from "../repositories/IRepository"
import { IServices } from "./IServices"

export class UserServices implements IServices<IUser, IUser, User>
{
    constructor(public repository: IRepository<IUser, IUser>) {}

    async create(user: User) {
        const user_interface = user.toInterface()
        await this.repository.create(user_interface)
    }

    async get(filter?: Partial<IUser>) {
        const users_interface = await this.repository.get(filter)
        const users = users_interface.map(user_interface => User.fromInterface(user_interface))
        return users
    }

    async getAll() {
        const users_interface = await this.repository.get()
        const users = users_interface.map(user_interface => User.fromInterface(user_interface))
        return users
    }

    async getById(id: string) {
        const user = (await this.get({ id }))[0]
        return user
    }

    async getByIds(ids: string[]) {
        const users_interface = await this.repository.getByIds(ids)
        const users = users_interface.map(user_interface => User.fromInterface(user_interface))
        return users
    }

    async getByUsername(username: string) {
        const user_list = await this.get({ username })
        if (user_list.length === 0) {
            console.log('Lista vazia')
            return null
        }
        const user = user_list[0]
        return user
    }

    async update(id: string, user: Partial<IUser>) {
        await this.repository.update(id, user)
        return this.getById(id)
    }

    async delete(filter?: Partial<IUser>) {
        await this.repository.delete(filter)
    }

    async deleteById(id: string) {
        await this.repository.delete({ id })
    }

    async deleteByIds(ids: string[]) {
        await this.repository.deleteByIds(ids)
    }

    async deleteByUsername(username: string) {
        await this.repository.delete({ username })
    }
}

export const userServices = new UserServices(userRepository)