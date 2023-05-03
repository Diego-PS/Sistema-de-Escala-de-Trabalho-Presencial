// import { memberRepository } from "../repositories"
import { IUser, User } from "./User"

export interface IMember extends IUser
{
    team_leader_id: string,
    desired_mon: boolean
    desired_tue: boolean
    desired_wed: boolean
    desired_thu: boolean
    desired_fri: boolean
    actual_mon: boolean
    actual_tue: boolean
    actual_wed: boolean
    actual_thu: boolean
    actual_fri: boolean
}

export class Member extends User implements IMember
{
    // static repository = memberRepository
    public readonly team_leader_id: string 

    public desired_mon: boolean
    public desired_tue: boolean
    public desired_wed: boolean
    public desired_thu: boolean
    public desired_fri: boolean
    public actual_mon: boolean
    public actual_tue: boolean
    public actual_wed: boolean
    public actual_thu: boolean
    public actual_fri: boolean

    constructor(props: Omit<IUser, 'id' | 'role'>, team_leader_id: string, id?: string) {
        super({ ...props, role: 'member' }, id)
        
        this.desired_mon = true
        this.desired_tue = true
        this.desired_wed = true
        this.desired_thu = true
        this.desired_fri = true

        this.actual_mon = true
        this.actual_tue = true
        this.actual_wed = true
        this.actual_thu = true
        this.actual_fri = true

        this.team_leader_id = team_leader_id
    }
}