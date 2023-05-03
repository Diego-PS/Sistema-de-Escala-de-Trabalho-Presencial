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

    constructor(props: Omit<IUser, 'id'>, id?: string) {
        Object.assign(this, props)
        if (!id) {
            this.id = uuid()
        } else {
            this.id = id
        }
    }
}