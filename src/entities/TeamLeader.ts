import { teamLeaderRepository } from "../repositories"
import { Member } from "./Member"
import { IUser, User } from "./User"

export interface ITeamLeader extends IUser
{
    boss_id: string,
    team_name: string,
    moa: number
    mpw: number
} 

export class TeamLeader extends User implements ITeamLeader
{
    static create = async (team_leader: TeamLeader) => await teamLeaderRepository.create(team_leader)
    static get = async (filter?: Partial<TeamLeader>) => await teamLeaderRepository.get(filter)
    
    public readonly boss_id: string

    public team_name: string
    public moa: number
    public mpw: number

    createMember = (props: Omit<User, 'id'>) => new Member(props, this.id)

    update = async (team_leader: Partial<Pick<TeamLeader, 'name' | 'moa' | 'mpw'>>) => {
        const updated = await teamLeaderRepository.update(this.id, team_leader)
        Object.assign(this, updated)
    }
    delete = async () => teamLeaderRepository.delete({ id: this.id })

    constructor(props: Omit<ITeamLeader, 'id' | 'role'>, id?: string) {
        super({ ...props, role: 'team_leader' }, id)
        this.team_name = props.team_name
        this.moa = props.moa
        this.mpw = props.mpw
    }
}
