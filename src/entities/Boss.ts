import { bossRepository } from "../repositories"
import { ITeamLeader, TeamLeader } from "./TeamLeader"
import { IUser, User } from "./User"

export interface IBoss extends IUser
{
    organization_name: string
    moa: number
    mpw: number
}

export class Boss extends User implements IBoss
{
    static create = async (props: Omit<IBoss, 'id' | 'role'>) => await bossRepository.create(new Boss(props))
    static get = async (filter?: Partial<Boss>) => await bossRepository.get(filter)
    static delete = async (filter?: Partial<Boss>) => await bossRepository.delete(filter)

    public organization_name: string
    public moa: number //minimum_office_attendance
    public mpw: number // minimum_percentage_of_workers_in_the_office

    // getOrganizationRules = () => new Rules(this.organization_rules.minimum_office_attendance, this.organization_rules.minimum_percentage_of_workers_in_the_office)
    createTeamLeader = async (props: Omit<ITeamLeader, 'id' | 'boss_id' | 'moa' | 'mpw' | 'role'>) => await TeamLeader.create(new TeamLeader({ ...props, boss_id: this.id, moa: this.moa, mpw: this.mpw }))
    
    update = async (boss: Partial<Pick<Boss, 'name' | 'moa' | 'mpw'>>) => {
        const updated = await bossRepository.update(this.id, boss)
        Object.assign(this, updated)
    }
    delete = async () => bossRepository.delete({ id: this.id })

    constructor(props?: Omit<IBoss, 'id' | 'role'>, id?: string) {
        super({ ...props, role: 'boss' }, id)
        Object.assign(this, props)
    }
}