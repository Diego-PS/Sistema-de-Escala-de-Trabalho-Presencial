import { Schedule } from "./Schedule"
import { IUser, User } from "./User"

export interface IMember extends IUser
{
    team_leader_id: string,
    desired_schedule: Schedule,
    actual_schedule: Schedule
}

export class Member extends User implements IMember
{
    public readonly team_leader_id: string 

    public desired_schedule: Schedule
    public actual_schedule: Schedule

    constructor(props: Omit<User, 'id'>, team_leader_id: string) {
        super(props)
        this.actual_schedule = new Schedule({
            'mon': true,
            'tue': true,
            'wed': true,
            'thu': true,
            'fri': true
        })
        this.desired_schedule = this.actual_schedule
        this.team_leader_id = team_leader_id
    }
}