// import { Rules } from "./Rules"

// export class Schedule 
// {
//     public mon: boolean
//     public tue: boolean
//     public wed: boolean
//     public thu: boolean
//     public fri: boolean

//     getAttendance = () => Number(this.mon) + Number(this.tue) + Number(this.wed) + Number(this.thu) + Number(this.fri)

//     satisfies = (rules: Rules) => this.getAttendance() <= rules.getMOA()

//     constructor(props: Pick<Schedule, 'mon' | 'tue' | 'wed' | 'thu' | 'fri'>) {
//         Object.assign(props)
//     }
// }