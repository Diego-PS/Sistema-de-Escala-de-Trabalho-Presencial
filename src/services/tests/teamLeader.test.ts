import { expect } from '@jest/globals';
import { bossServices, teamLeaderServices } from ".."
import { TeamLeader } from '../../entities/TeamLeader';
import { connectDB, disconnectDB } from '../../connectDB';
import { Boss } from '../../entities/Boss';

const addFile = (text: string) => text + 'teamLeader'

describe('Testing TeamLeaderService', () => {

    test('Creating TeamLeader', async () => {
        await connectDB()
        const boss_to_be_created = new Boss({
            organization_name: addFile('Organization'),
            name: addFile('Boss'),
            username: addFile('Boss'),
            password: '123456',
            organization_rules: {
                moa: 0,
                mpw: 0
            }
        })
        await bossServices.create(boss_to_be_created)
        const created_boss = await bossServices.getByUsername(boss_to_be_created.username)
        
        const team_leader_to_be_created = new TeamLeader({
            boss_id: created_boss.id,
            name: addFile('TestTeamLeader'),
            username: addFile('TestTeamLeader'),
            password: '123456',
            team_name: addFile('TestTeam'),
            team_rules: {
                moa: 0,
                mpw: 0
            }
        })
        await teamLeaderServices.create(team_leader_to_be_created)
        const created_team_leader = await teamLeaderServices.getById(team_leader_to_be_created.id)
        expect(created_team_leader.name).toBe(team_leader_to_be_created.name)
        
        // created_team_leader.changeTeamRules({ moa: 1, mpw: 30 })
        // const updated_team_leader = await teamLeaderServices.getById(team_leader_to_be_created.id)
        // expect(updated_team_leader.team_rules.getMOA()).toBe(1)
        // expect(updated_team_leader.team_rules.getMPW()).toBe(30)

        // await updated_team_leader.delete()
        await created_boss.delete()
        await disconnectDB()
    })
})