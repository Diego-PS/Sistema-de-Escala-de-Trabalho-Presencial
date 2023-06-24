import { expect } from '@jest/globals';
import { memberServices } from ".."
import { Member } from '../../entities/Member';
import { Schedule } from '../../abstractions/Schedule';
import { connectDB, disconnectDB } from '../../connectDB';

describe('Testing memberService', () => {

    test('Creating member', async () => {
        await connectDB()
        const member_to_be_created = new Member({
            team_leader_id: 'team_leader_id',
            desired_schedule: new Schedule({
                mon: true,
                tue: true,
                wed: true,
                thu: true,
                fri: true
            }),
            actual_schedule: new Schedule({
                mon: true,
                tue: true,
                wed: true,
                thu: true,
                fri: true
            }),
            name: 'TestMember',
            username: 'TestMember',
            password: '123456',
        })

        await memberServices.create(member_to_be_created)
        const created_member = await memberServices.getByUsername('TestMember')
        expect(created_member.name).toBe('TestMember')

        await created_member.delete()
		await disconnectDB()
    })

})