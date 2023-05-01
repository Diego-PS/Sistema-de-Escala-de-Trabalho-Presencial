import { Rules } from "./Rules"
import { TeamLeader } from "./TeamLeader"
import { IUser, User } from "./User"

export interface IBoss extends IUser
{
    organization_name: string
    organization_rules: Rules
}

export class Boss extends User implements IBoss
{
    public organization_name: string
    public organization_rules: Rules

    createTeamLeader = (props: Omit<TeamLeader, 'id' | 'boss_id' | 'team_rules'>) => new TeamLeader(props, this)
}