import { expect } from '@jest/globals';
import { bossServices } from ".."
import { Boss } from '../../entities/Boss';
import dotenv from 'dotenv'
import mongoose from 'mongoose';

describe('Testing bossService', () => {

    test('Creating boss', async () => {
        dotenv.config()
        const databaseConnection = process.env.DB_CONNECTION_PRESENTATION
        await mongoose.connect(databaseConnection)
        const boss_to_be_created = new Boss({
            organization_name: 'Test Organization',
            name: 'TestBoss',
            username: 'TestBoss',
            password: '123456',
            organization_rules: {
                moa: 0,
                mpw: 0
            }
        })
        await bossServices.create(boss_to_be_created)
        const created_boss = await bossServices.getByUsername('TestBoss')
        expect(created_boss.organization_name).toBe('Test Organization')
        await created_boss.delete()
    })

    test('Update boss', async () => {
        const boss_to_be_created = new Boss({
            organization_name: 'Test Organization',
            name: 'TestBoss',
            username: 'TestBoss',
            password: '123456',
            organization_rules: {
                moa: 0,
                mpw: 0
            }
        })
        await bossServices.create(boss_to_be_created)
        const created_boss = await bossServices.getByUsername('TestBoss')
        bossServices.update(created_boss.id, { name: 'NewTestBoss'})
        const updated_boss = await bossServices.getByUsername('TestBoss')
        expect(updated_boss.name).toBe('NewTestBoss')

        await updated_boss.delete()
        await mongoose.disconnect()
    })

    test('should pass', () => {
        expect(1+1).toBe(2)
    })
})