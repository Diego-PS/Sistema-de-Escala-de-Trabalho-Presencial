import { BossDB } from "../database/models/BossDB"
import { Boss, IBoss } from "../entities/Boss"

export class BossRepository 
{
    async create(boss: Boss) {
        const bossDB = new BossDB()
        Object.assign(bossDB, boss)
        const created_boss = await bossDB.save()
        return created_boss as IBoss as Boss
    }
    
    async get(filter?: Partial<Boss>) {
        const bossesDB = await BossDB.find(filter)
        const bosses = bossesDB.map(bossDB => {
            const boss_interface = bossDB as IBoss
            const boss = new Boss({
                name: boss_interface.name,
                username: boss_interface.username,
                password: boss_interface.password,
                organization_name: boss_interface.organization_name,
                moa: boss_interface.moa,
                mpw: boss_interface.mpw
            }, boss_interface.id)
            return boss
        })
        return bosses
    }

    async update(id: string, boss: Partial<Pick<Boss, 'name' | 'moa' | 'mpw'>>) {
        await BossDB.updateOne({ id }, boss)
        return this.get({ id })
    }

    async delete(filter?: Partial<Boss>) {
        await BossDB.deleteMany(filter)
        return true
    }
}