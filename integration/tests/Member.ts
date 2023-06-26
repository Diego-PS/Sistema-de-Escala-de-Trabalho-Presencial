import { expect } from '@jest/globals';
import { cleanDB, connectDB, disconnectDB } from '../../src/connectDB';
import { Boss } from '../../src/entities/Boss';
import { TeamLeader } from '../../src/entities/TeamLeader';
import { Member } from '../../src/entities/Member';
import { Schedule } from '../../src/abstractions/Schedule';
import { Rules } from '../../src/abstractions/Rules';

const file = 'Member'

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

const team_leader_props = {
    name: 'TestTeamLeader' + file,
    username: 'TestTeamLeader' + file,
    team_name: 'Test Team' + file,
    password: '123456'
}

const member_props = {
    name: 'TestMember' + file,
    username: 'TestMember' + file,
    password: '123456'
}

const updated_member_props = {
    name: 'NewTestMember' + file,
    desired_schedule: {
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: false
    }
}

export const MemberTests = () => describe('Testing Member functions', () => {

    beforeEach(async () => {
        await connectDB()
    })
    
    afterEach(async () => {
        await cleanDB()
        await disconnectDB()
    })

    test('Should create a member', async () => {
        await Boss.create(boss_props)
        const created_boss = await Boss.getByUsername(boss_props.username)
        await created_boss.createTeamLeader(team_leader_props)
        const team_leaders = await TeamLeader.getAll()
        const created_team_leader = team_leaders[0]
        await created_team_leader.createMember(member_props)
        const members = await Member.getAll()
        const created_member = members[0]
        expect(created_member.name).toBe(member_props.name)
        expect(created_member.username).toBe(member_props.username)
    })

    test('Should change member name', async () => {
        await Boss.create(boss_props)
        const created_boss = await Boss.getByUsername(boss_props.username)
        await created_boss.createTeamLeader(team_leader_props)
        const team_leaders = await TeamLeader.getAll()
        const created_team_leader = team_leaders[0]
        await created_team_leader.createMember(member_props)
        const members = await Member.getAll()
        const created_member = members[0]
        await created_member.update({ name: updated_member_props.name })
        expect(created_member.name).toBe(updated_member_props.name)
    })

    test('Should delete member', async () => {
        await Boss.create(boss_props)
        const created_boss = await Boss.getByUsername(boss_props.username)
        await created_boss.createTeamLeader(team_leader_props)
        const team_leaders = await TeamLeader.getAll()
        const created_team_leader = team_leaders[0]
        await created_team_leader.createMember(member_props)
        const members = await Member.getAll()
        const created_member = members[0]
        await created_member.delete()
        expect((await Member.getAll()).length).toBe(0)
    })

    test('Schedule', () => {
        const schedule = new Schedule({ mon: true, tue: true, wed: true, thu: false, fri: false })
        const rules1 = new Rules({ moa: 4, mpw: 50 })
        const rules2 = new Rules({ moa: 3, mpw: 40 })
        expect(schedule.satisfies(rules1)).toBe(false)
        expect(schedule.satisfies(rules2)).toBe(true)
        expect(rules1.satisfies(rules2)).toBe(true)
        expect(rules2.satisfies(rules1)).toBe(false)
    })
})