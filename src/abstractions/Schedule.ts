import { Rules } from "./Rules"

export interface ISchedule
{
    mon: boolean
    tue: boolean
    wed: boolean
    thu: boolean
    fri: boolean
}

export class Schedule 
{
    public mon: boolean
    public tue: boolean
    public wed: boolean
    public thu: boolean
    public fri: boolean

    getAttendance = () => Number(this.mon) + Number(this.tue) + Number(this.wed) + Number(this.thu) + Number(this.fri)

    satisfies = (rules: Rules) => this.getAttendance() <= rules.getMOA()

    constructor(props: ISchedule) {
        Object.assign(this, props)
    }
}