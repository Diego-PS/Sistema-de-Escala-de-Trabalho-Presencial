import { Rules } from "./Rules";
import { ISchedule } from "./Schedule";

export interface ITeamSchedule
{
    [key: string]: ISchedule
}

export class TeamSchedule
{
    constructor(public team_schedule: ITeamSchedule) {}

    getAttendanceOfDay(day: string) {
        return Object.keys(this.team_schedule).reduce((acc, username) => acc + Number(this.team_schedule[username][day]), 0)
    }

    satisfies(rules: Rules) {
        return ['mon', 'tue', 'wed', 'thu', 'fri'].reduce((acc, day) => acc && 100*this.getAttendanceOfDay(day) >= rules.getMPW()*Object.keys(this.team_schedule).length, true)
    }
}