import { BossDB } from "../database/models/BossDB"
import { IBoss } from "../entities/Boss"
import { IRepository } from "./IRepository"

export class BossRepository implements IRepository<IBoss>
{
    async create(boss: IBoss) {
        const bossDB = new BossDB()
        Object.assign(bossDB, boss)
        const created_bossDB = await bossDB.save()
        const created_boss_interface = created_bossDB as IBoss
        return created_boss_interface
    }
    
    async get(filter?: Partial<IBoss>) {
        const bossesDB = await BossDB.find(filter)
        const bosses_interface = bossesDB as IBoss[]
        return bosses_interface
    }

    async update(id: string, boss: Partial<IBoss>) {
        await BossDB.updateOne({ id }, boss)
        return this.get({ id })[0]
    }

    async delete(filter?: Partial<IBoss>) {
        await BossDB.deleteMany(filter)
        return true
    }
}