import { ISchedule, Schedule } from "../abstractions/Schedule"
import { IUser, User } from "./User"
import { memberServices } from "../services"

export interface IMember extends IUser
{
    team_leader_id: string,
    desired_schedule: ISchedule
    actual_schedule: ISchedule
}

export interface IExParamsMember
{
    id: string
    team_leader_id: string,
    desired_schedule: ISchedule
    actual_schedule: ISchedule
}

export class Member extends User
{
    static fromInterface = (member_interface: IMember) => new Member({
        team_leader_id: member_interface.team_leader_id,
        name: member_interface.name,
        username: member_interface.username,
        password: member_interface.password,
        desired_schedule: member_interface.desired_schedule,
        actual_schedule: member_interface.actual_schedule
    }, member_interface.id)
    static create = async (props: Omit<IMember, 'id' | 'role'>) => await memberServices.create(new Member(props))
    static getAll = async () => await memberServices.getAll()
    static getById = async (id: string) => await memberServices.getById(id)
    static getByUsername = async (username: string) => await memberServices.getByUsername(username)

    public readonly team_leader_id: string

    public desired_schedule: Schedule
    public actual_schedule: Schedule

    toInterface = () => ({
        team_leader_id: this.team_leader_id,
        id: this.id,
        name: this.name,
        username: this.username,
        password: this.password,
        role: this.role,
        desired_schedule: this.desired_schedule,
        actual_schedule: this.actual_schedule,
    }) as IMember
    toUserInterface = () => ({
        id: this.id,
        name: this.name,
        username: this.username,
        password: this.password,
        role: this.role
    }) as IUser

    changeDesiredSchedule = async (new_schedule: ISchedule) => await memberServices.changeDesiredSchedule(this.id, new_schedule)
    update = async (member: { name?: string, desired_schedule?: ISchedule, actual_schedule?: ISchedule }) => {
        const updated = await memberServices.update(this.id, member)
        Object.assign(this, updated)
    }
    delete = async () => await memberServices.deleteById(this.id)

    constructor(props: Omit<IMember, 'id' | 'role'>, id?: string) {
        super({ ...props, role: 'member' }, id)
        this.desired_schedule = new Schedule(props.desired_schedule)
        this.actual_schedule = new Schedule(props.actual_schedule)
        this.team_leader_id = props.team_leader_id
    }
}