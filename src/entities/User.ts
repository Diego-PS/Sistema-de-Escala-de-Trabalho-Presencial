import { uuid } from "uuidv4"

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
    public readonly id: string

    public name: string
    public username: string
    public password: string
    public role: string

    constructor(props: Omit<User, 'id'>) {
        Object.assign(this, props)
        this.id = uuid()
    }
}