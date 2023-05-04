import { IRepository } from "../repositories/IRepository";

export interface IServices<IEntity, IExParamsEntity, Entity>
{
    repository: IRepository<IEntity, IExParamsEntity>
    create: (entity: Entity) => Promise<void>
    get: (filter?: Partial<IEntity>) => Promise<Entity[]>
    getAll: () => Promise<Entity[]>
    getById: (id: string) => Promise<Entity>
    getByUsername: (username: string) => Promise<Entity>
    update: (id: string, entity: Partial<IEntity>) => Promise<Entity>
    deleteById: (id: string) => Promise<void>
    deleteByUsername: (username: string) => Promise<void>
}