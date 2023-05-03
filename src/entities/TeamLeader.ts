import { teamLeaderRepository } from "../repositories"
import { IMember, Member } from "./Member"
import { IRules, Rules } from "./Rules"
import { IUser, User } from "./User"

export interface ITeamLeader extends IUser
{
    boss_id: string,
    team_name: string,
    team_rules: IRules
} 

export class TeamLeader extends User
{
    static fromInterface = (team_leader_interface: ITeamLeader) => new TeamLeader({
        boss_id: team_leader_interface.boss_id,
        name: team_leader_interface.name,
        username: team_leader_interface.username,
        password: team_leader_interface.password,
        team_name: team_leader_interface.team_name,
        team_rules: team_leader_interface.team_rules
    }, team_leader_interface.id)
    static create = async (props: Omit<ITeamLeader, 'id' | 'role'>) => await teamLeaderRepository.create((new TeamLeader(props)).toInterface())
    static get = async (filter?: Partial<ITeamLeader>) => await teamLeaderRepository.get(filter)
    static delete = async (filter?: Partial<ITeamLeader>) => await teamLeaderRepository.delete(filter)
    
    public readonly boss_id: string

    public team_name: string
    public team_rules: Rules

    toInterface = () => ({
        boss_id: this.boss_id,
        id: this.id,
        name: this.name,
        username: this.username,
        password: this.password,
        role: this.role,
        team_name: this.team_name,
        team_rules: {
            moa: this.team_rules.getMOA(),
            mpw: this.team_rules.getMPW()
        }
    }) as ITeamLeader

    createMember = async (props: Omit<IMember, 'id' | 'team_leader_id' | 'desired_schedule' | 'actual_schedule' | 'role'>) => await Member.create({ ...props, team_leader_id: this.id, desired_schedule: { mon: true, tue: true, wed: true, thu: true, fri: true}, actual_schedule: { mon: true, tue: true, wed: true, thu: true, fri: true} })
    
    update = async (team_leader: { name?: string, team_rules?: IRules }) => {
        const updated = await teamLeaderRepository.update(this.id, team_leader)
        Object.assign(this, updated)
    }
    delete = async () => teamLeaderRepository.delete({ id: this.id })

    constructor(props: Omit<ITeamLeader, 'id' | 'role'>, id?: string) {
        super({ ...props, role: 'team_leader' }, id)
        this.team_name = props.team_name
        this.team_rules = new Rules(props.team_rules.moa, props.team_rules.mpw)
    }
}
