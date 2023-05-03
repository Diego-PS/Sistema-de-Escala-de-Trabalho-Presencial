import { BossDB } from "../database/models/BossDB"
import { Boss, IBoss } from "../entities/Boss"
import { IRules, Rules } from "../entities/Rules"

export class BossRepository 
{
    async create(boss: IBoss) {
        const bossDB = new BossDB()
        Object.assign(bossDB, boss)
        const created_bossDB = await bossDB.save()
        const created_boss_interface = created_bossDB as IBoss
        const created_boss = Boss.fromInterface(created_boss_interface)
        return created_boss
    }
    
    async get(filter?: Partial<IBoss>) {
        const bossesDB = await BossDB.find(filter)
        const bosses = bossesDB.map(bossDB => {
            const boss_interface = bossDB as IBoss
            const boss = Boss.fromInterface(boss_interface)
            return boss
        })
        return bosses
    }

    async update(id: string, boss: { name?: string, organization_rules?: IRules }) {
        await BossDB.updateOne({ id }, boss)
        return this.get({ id })
    }

    async delete(filter?: Partial<IBoss>) {
        await BossDB.deleteMany(filter)
        return true
    }
}