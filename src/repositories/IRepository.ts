export interface IRepository<IEntity>
{
    create: (payload: IEntity) => Promise<IEntity>
    get: (filter?: Partial<IEntity>) => Promise<IEntity[]>
    update: (id: string, payload: Partial<IEntity>) => Promise<IEntity>
    delete: (filter?: Partial<IEntity>) => Promise<boolean>
}