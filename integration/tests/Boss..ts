import { expect } from '@jest/globals';
import { cleanDB, connectDB, disconnectDB } from '../../src/connectDB';
import { Boss } from '../../src/entities/Boss';

const file = 'Boss'

const boss_props = {
    name: 'TestBoss' + file,
    username: 'TestBoss' + file,
    organization_name: 'Test Organization' + file,
    password: '123456',
    organization_rules: {
        moa: 0,
        mpw: 0
    }
}

const updated_boss_props = {
    new_name: 'NewTestBoss' + file,
    organization_rules: {
        moa: 2,
        mpw: 40
    }
}

export const BossTests = () => describe('Testing Boss functions', () => {

    beforeEach(async () => {
        await connectDB()
    })
    
    afterEach(async () => {
        await cleanDB()
        await disconnectDB()
    })

    test('Should create a boss', async () => {
        await Boss.create(boss_props)
        const created_boss = await Boss.getByUsername(boss_props.username)
        expect(created_boss.organization_name).toBe(boss_props.organization_name)
        expect(created_boss.name).toBe(boss_props.name)
        expect(created_boss.username).toBe(boss_props.username)
        expect(created_boss.organization_rules.getMOA()).toBe(boss_props.organization_rules.moa)
        expect(created_boss.organization_rules.getMPW()).toBe(boss_props.organization_rules.mpw)
    })

    test('Should change boss name', async () => {
        await Boss.create(boss_props)
        const created_boss = await Boss.getByUsername(boss_props.username)
        await Boss.getById(created_boss.id)
        await created_boss.update({ name: updated_boss_props.new_name })
        expect(created_boss.name).toBe(updated_boss_props.new_name)
    })

    test('Should change organization rules', async () => {
        await Boss.create(boss_props)
        const created_boss = await Boss.getByUsername(boss_props.username)
        await Boss.getById(created_boss.id)
        await created_boss.update({ organization_rules: updated_boss_props.organization_rules })
        expect(created_boss.organization_rules.getMOA()).toBe(updated_boss_props.organization_rules.moa)
        expect(created_boss.organization_rules.getMPW()).toBe(updated_boss_props.organization_rules.mpw)
    })

    test('Should get team leaders', async () => {
        await Boss.create(boss_props)
        const created_boss = await Boss.getByUsername(boss_props.username)
        await Boss.getById(created_boss.id)
        const team_leaders = await created_boss.getTeamLeaders()
        expect(team_leaders.length).toBe(0)
    })

    test('Should delete the boss', async () => {
        await Boss.create(boss_props)
        const created_boss = await Boss.getByUsername(boss_props.username)
        await created_boss.delete()
        expect((await Boss.getAll()).length).toBe(0)
    })
})

export const BossTestsDemo = () => describe('Testing Boss functions', () => {

    beforeEach(async () => {
        await connectDB()
    })
    
    afterEach(async () => {
        await cleanDB()
        await disconnectDB()
    })

    test('Should create a boss', () => {})

    test('Should change boss name', () => {})

    test('Should change organization rules', () => {})

    test('Should get team leaders', () => {})

    test('Should delete the boss', () => {})
})