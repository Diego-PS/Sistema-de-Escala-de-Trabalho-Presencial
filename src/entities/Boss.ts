import { bossRepository } from "../repositories"
import { IRules, Rules } from "./Rules"
import { ITeamLeader, TeamLeader } from "./TeamLeader"
import { IUser, User } from "./User"

export interface IBoss extends IUser
{
    organization_name: string
    organization_rules: IRules
}

export interface IExParamsBoss
{
    id: string
    organization_name: string
    organization_rules: IRules
}

export class Boss extends User
{
    static fromInterface = (boss_interface: IBoss) => new Boss({
        name: boss_interface.name,
        username: boss_interface.username,
        password: boss_interface.password,
        organization_name: boss_interface.organization_name,
        organization_rules: boss_interface.organization_rules
    }, boss_interface.id)
    // static create = async (props: Omit<IBoss, 'id' | 'role'>) => Boss.fromInterface(await bossRepository.create((new Boss(props)).toInterface()))
    // static get = async (filter?: Partial<IBoss>) => (await bossRepository.get(filter)).map(boss_interface => Boss.fromInterface(boss_interface))
    // static delete = async (filter?: Partial<IBoss>) => await bossRepository.delete(filter)

    public organization_name: string
    public organization_rules: Rules

    toInterface = () => ({
        id: this.id,
        name: this.name,
        username: this.username,
        password: this.password,
        role: this.role,
        organization_name: this.organization_name,
        organization_rules: {
            moa: this.organization_rules.getMOA(),
            mpw: this.organization_rules.getMPW()
        }
    }) as IBoss
    toUserInterface = () => ({
        id: this.id,
        name: this.name,
        username: this.username,
        password: this.password,
        role: this.role
    }) as IUser
    
    // createTeamLeader = async (props: Omit<ITeamLeader, 'id' | 'boss_id' | 'team_rules' | 'role'>) => await TeamLeader.create({ ...props, boss_id: this.id, team_rules: { moa: this.organization_rules.getMOA(), mpw: this.organization_rules.getMPW() } })
    
    // update = async (boss: { name?: string, organization_rules?: IRules }) => {
    //     const updated = await bossRepository.update(this.id, boss)
    //     Object.assign(this, updated)
    // }
    // delete = async () => bossRepository.delete({ id: this.id })

    constructor(props?: Omit<IBoss, 'id' | 'role'>, id?: string) {
        super({ ...props, role: 'boss' }, id)
        this.organization_name = props.organization_name
        this.organization_rules = new Rules(props.organization_rules.moa, props.organization_rules.mpw)
    }
}