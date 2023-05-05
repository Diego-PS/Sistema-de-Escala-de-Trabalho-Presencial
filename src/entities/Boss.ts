import { IRules, Rules } from "../abstractions/Rules"
import { ITeamLeader, TeamLeader } from "./TeamLeader"
import { IUser, User } from "./User"
import { bossServices } from "../services"

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
    static create = async (props: Omit<IBoss, 'id' | 'role'>) => await bossServices.create(new Boss(props))
    static getAll = async (filter?: Partial<IBoss>) => await bossServices.getAll()
    static getById = async (id: string) => await bossServices.getById(id)
    static getByUsername = async (username: string) => await bossServices.getByUsername(username)

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
    
    createTeamLeader = async (props: Omit<ITeamLeader, 'id' | 'boss_id' | 'team_rules' | 'role'>) => await TeamLeader.create({ ...props, boss_id: this.id, team_rules: { moa: this.organization_rules.getMOA(), mpw: this.organization_rules.getMPW() } })
    getTeamLeaders = async () => await bossServices.getTeamLeaders(this.id)
    
    changeOrganizationRules = async (new_rules: IRules) => bossServices.changeOrganizationRules(this.id, new_rules)
    update = async (boss: { name?: string, organization_rules?: IRules, organization_name?: string }) => {
        const updated = await bossServices.update(this.id, boss)
        Object.assign(this, updated)
    }
    delete = async () => bossServices.deleteById(this.id)

    constructor(props?: Omit<IBoss, 'id' | 'role'>, id?: string) {
        super({ ...props, role: 'boss' }, id)
        this.organization_name = props.organization_name
        this.organization_rules = new Rules(props.organization_rules)
    }
}