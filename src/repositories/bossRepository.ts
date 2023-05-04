import { BossDB } from "../database/models/BossDB"
import { IBoss, IExParamsBoss } from "../entities/Boss"
import { IRepository } from "./IRepository"

export class BossRepository implements IRepository<IBoss, IExParamsBoss>
{
    async create(boss: IBoss) {
        const bossDB = new BossDB()
        Object.assign(bossDB, boss)
        await bossDB.save()
        return boss
    }
    
    async get(filter?: Partial<IBoss>) {
        const bossesDB = await BossDB.find(filter)
        const bosses_interface = bossesDB as IExParamsBoss[]
        return bosses_interface
    }

    async getByIds(ids: string[]) {
        const bossDB = await BossDB.find({
            id: { $in: ids }
        })
        const boss_interface = bossDB as IExParamsBoss[]
        return boss_interface
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