import { Request, Response } from "express";
import { ITeamLeaderServices } from "../services/teamLeaderServices";
import { Boss } from "../entities/Boss";
import { TeamLeader } from "../entities/TeamLeader";
import { teamLeaderServices } from "../services";

export class TeamLeaderController
{
    constructor(public services: ITeamLeaderServices) {}

    async register(req: Request, res: Response) {
        const boss_id = req.params.id
        try {
            const boss = await Boss.getById(boss_id)
            const team_leader = await boss.createTeamLeader(req.body)
            return res.status(201).json({ msg: 'Team successfully registered' })
        } catch(err) {
            return res.status(500).json({ msg: err?.message ?? 'Something went wrong' })
        }
    }

    async get(req: Request, res: Response) {
        try {
            const team_leaders = await TeamLeader.getAll()
            return res.status(201).json(team_leaders)
        } catch(err) {
            return res.status(500).json({ msg: err?.message ?? 'Something went wrong' })
        }
    }

    async getMembers(req: Request, res: Response) {
        const id = req.params.id
        try {
            const team_leader = await TeamLeader.getById(id)
            const members = await team_leader.getMembers()
            return res.status(201).json(members)
        } catch(err) {
            return res.status(500).json({ msg: err?.message ?? 'Something went wrong' })
        }
    }

    async changeTeamSchedule(req: Request, res: Response) {
        const id = req.params.id
        try {
            const team_leader = await TeamLeader.getById(id)
            await team_leader.changeTeamSchedule(req.body)
            return res.status(201).json({ msg: 'Team Schedule was successfully updated' })
        } catch(err) {
            return res.status(500).json({ msg: err?.message ?? 'Something went wrong' })
        }
    }

    async changeTeamRules(req: Request, res: Response) {
        const id = req.params.id
        try {
            const team_leader = await TeamLeader.getById(id)
            await team_leader.changeTeamRules(req.body)
            return res.status(201).json({ msg: 'Team rules successfully updated' })
        } catch(err) {
            return res.status(500).json({ msg: err?.message ?? 'Something went wrong' })
        }
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id
        try {
            teamLeaderServices.deleteById(id)
            return res.status(201).json({ msg: 'Team and its leader account successfully deleted' })
        } catch(err) {
            return res.status(500).json({ msg: err?.message ?? 'Something went wrong' })
        }
    }
}