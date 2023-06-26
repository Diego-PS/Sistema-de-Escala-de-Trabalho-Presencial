import { expect } from '@jest/globals';
import { cleanDB, connectDB, disconnectDB } from '../../src/connectDB';
import { Boss } from '../../src/entities/Boss';
import { TeamLeader } from '../../src/entities/TeamLeader';
import { TeamSchedule } from '../../src/abstractions/TeamSchedule';
import { Rules } from '../../src/abstractions/Rules';

const file = 'TeamLeader'

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

const updated_team_leader_props = {
    name: 'NewTestTeamLeader' + file,
    team_rules: {
        moa: 2,
        mpw: 40
    }
}

export const TeamLeaderTests = () => describe('Testing Team Leader functions', () => {

    beforeEach(async () => {
        await connectDB()
    })
    
    afterEach(async () => {
        await cleanDB()
        await disconnectDB()
    })

    test('Should create a team leader', async () => {
        await Boss.create(boss_props)
        const created_boss = await Boss.getByUsername(boss_props.username)
        await created_boss.createTeamLeader(team_leader_props)
        const team_leaders = await TeamLeader.getAll()
        const created_team_leader = team_leaders[0]
        expect(created_team_leader.team_name).toBe(team_leader_props.team_name)
        expect(created_team_leader.name).toBe(team_leader_props.name)
        expect(created_team_leader.username).toBe(team_leader_props.username)
        expect(created_team_leader.team_rules.getMOA()).toBe(boss_props.organization_rules.moa)
        expect(created_team_leader.team_rules.getMPW()).toBe(boss_props.organization_rules.mpw)
    })

    test('Should change team leader name', async () => {
        await Boss.create(boss_props)
        const created_boss = await Boss.getByUsername(boss_props.username)
        await created_boss.createTeamLeader(team_leader_props)
        const team_leaders = await TeamLeader.getAll()
        const created_team_leader = team_leaders[0]
        await created_team_leader.update({ name: updated_team_leader_props.name })
        expect(created_team_leader.name).toBe(updated_team_leader_props.name)
    })

    test('Should change team rules', async () => {
        await Boss.create(boss_props)
        const created_boss = await Boss.getByUsername(boss_props.username)
        await created_boss.createTeamLeader(team_leader_props)
        const team_leaders = await TeamLeader.getAll()
        const created_team_leader = team_leaders[0]
        await created_team_leader.update({ team_rules: updated_team_leader_props.team_rules })
        expect(created_team_leader.team_rules.getMOA()).toBe(updated_team_leader_props.team_rules.moa)
        expect(created_team_leader.team_rules.getMPW()).toBe(updated_team_leader_props.team_rules.mpw)
    })

    test('Should get team members', async () => {
        await Boss.create(boss_props)
        const created_boss = await Boss.getByUsername(boss_props.username)
        await created_boss.createTeamLeader(team_leader_props)
        const team_leaders = await TeamLeader.getAll()
        const created_team_leader = team_leaders[0]
        const members = await created_team_leader.getMembers()
        expect(members.length).toBe(0)
    })

    test('Should delete the team', async () => {
        await Boss.create(boss_props)
        const created_boss = await Boss.getByUsername(boss_props.username)
        await created_boss.createTeamLeader(team_leader_props)
        const team_leaders = await TeamLeader.getAll()
        const created_team_leader = team_leaders[0]
        await created_team_leader.delete()
        expect((await TeamLeader.getAll).length).toBe(0)
    })

    test('TeamSchedule', async () => {
        const schedule = new TeamSchedule({
            1: { mon: true, tue: true, wed: true, thu: false, fri: false },
            2: { mon: false, tue: false, wed: true, thu: true, fri: true }
        })
        const rules = new Rules({ moa: 3, mpw: 50 })
        expect(schedule.satisfies(rules)).toBe(true)
    })
})