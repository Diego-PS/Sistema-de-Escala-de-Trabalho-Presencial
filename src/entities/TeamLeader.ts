import { Boss } from "./Boss"
import { Member } from "./Member"
import { Rules } from "./Rules"
import { IUser, User } from "./User"

export interface ITeamLeader extends IUser
{
    boss_id: string,
    team_name: string,
    team_rules: Rules
} 

export class TeamLeader extends User implements ITeamLeader
{
    public readonly boss_id: string

    public team_name: string
    public team_rules: Rules

    createMember = (props: Omit<User, 'id'>) => new Member(props, this.id)

    constructor(props: Omit<TeamLeader, 'id' | 'boss_id' | 'team_rules'>, boss: Boss) {
        super(props)
        this.team_rules = boss.organization_rules
        this.boss_id = boss.id
    }
}
