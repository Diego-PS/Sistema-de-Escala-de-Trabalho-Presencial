export interface IRepository<IEntity, IExParamsEntity>
{
    create: (payload: IEntity) => Promise<IEntity>
    get: (filter?: Partial<IEntity>) => Promise<IExParamsEntity[]>
    getByIds: (ids: string[]) => Promise<IExParamsEntity[]>
    update: (id: string, payload: Partial<IEntity>) => Promise<IExParamsEntity>
    delete: (filter?: Partial<IEntity>) => Promise<boolean>
}