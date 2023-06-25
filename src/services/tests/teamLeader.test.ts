import { expect } from '@jest/globals';
import { teamLeaderServices } from ".."
import { TeamLeader } from '../../entities/TeamLeader';
import { connectDB, disconnectDB } from '../../connectDB';
import { uptime } from 'process';

describe('Testing TeamLeaderService', () => {

    test('Creating TeamLeader', async () => {
        await connectDB()
        const teamLeader_to_be_created = new TeamLeader({
            boss_id: 'boss_id',
            name: 'TestTeamLeader',
            username: 'TestTeamLeader',
            password: '123456',
            team_name: 'teste',
            team_rules: {
                moa: 0,
                mpw: 0
            }
        })
        await teamLeaderServices.create(teamLeader_to_be_created)
        const created_TeamLeader = await teamLeaderServices.getByUsername('TestTeamLeader')
        expect(created_TeamLeader.name).toBe('TestTeamLeader')
        await created_TeamLeader.delete()
    })

    test('Changing Team Rules', async () => {
        await connectDB()
        const teamLeader_to_be_created = new TeamLeader({
            boss_id: 'boss_id',
            name: 'TestTeamLeader',
            username: 'TestTeamLeader',
            password: '123456',
            team_name: 'teste',
            team_rules: {
                moa: 0,
                mpw: 0
            }
        })
        await teamLeaderServices.create(teamLeader_to_be_created)
        const created_TeamLeader = await teamLeaderServices.getByUsername('TestTeamLeader')
        
        teamLeaderServices.changeTeamRules(created_TeamLeader.id, { moa: 1 , mpw: 1})
        const updated_team_leader = await teamLeaderServices.getByUsername('TestTeamLeader')
        expect(updated_team_leader.team_rules).toBe({moa: '1' , mpw: '1'})

        await updated_team_leader.delete()
        await created_TeamLeader.delete()
        await disconnectDB()
        
    })
})