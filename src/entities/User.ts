import { v4 } from "uuid"
import { userServices } from "../services/userServices"

export interface IUser 
{
    id: string
    name: string
    username: string
    password: string
    role: string
}

export class User implements IUser
{
    static fromInterface = (user_interface: IUser) => new User({
        name: user_interface.name,
        username: user_interface.username,
        password: user_interface.password,
        role: user_interface.role
    }, user_interface.id)
    static getAll = async () => await userServices.getAll()
    static getById = async (id: string) => await userServices.getById(id)
    static getByUsername = async (username: string) => await userServices.getByUsername(username)

    public readonly id: string

    public name: string
    public username: string
    public password: string
    public role: string

    toInterface = () => ({
        id: this.id,
        name: this.name,
        username: this.username,
        password: this.password,
        role: this.role
    }) as IUser

    constructor(props: Omit<IUser, 'id'>, id?: string) {
        Object.assign(this, props)
        if (!id) {
            this.id = v4()
        } else {
            this.id = id
        }
    }
}