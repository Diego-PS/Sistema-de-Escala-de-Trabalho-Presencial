import { Request, Response } from "express";
import { IMemberServices } from "../services/memberServices";
import { TeamLeader } from "../entities/TeamLeader";
import { Member } from "../entities/Member";
import { memberServices } from "../services";

export class MemberController
{
    constructor(public services: IMemberServices) {}

    async register(req: Request, res: Response) {
        const team_leader_id = req.params.id
        try {
            const team_leader = await TeamLeader.getById(team_leader_id)
            const member = await team_leader.createMember(req.body)
            return res.redirect('/gerencia.html')
            return res.status(201).json({ msg: 'Member successfully registered' })
        } catch(err) {
            return res.status(500).json({ msg: err?.message ?? 'Something went wrong' })
        }
    }

    async get(req: Request, res: Response) {
        try {
            const members = await Member.getAll()
            return res.status(201).json(members)
        } catch(err) {
            return res.status(500).json({ msg: err?.message ?? 'Something went wrong' })
        }
    }

    async changeDesiredSchedule(req: Request, res: Response) {
        const id = req.params.id
        try {
            const member = await Member.getById(id)
            await member.changeDesiredSchedule(req.body)
            return res.status(201).json({ msg: 'Desired Schedule was successfully updated' })
        } catch(err) {
            return res.status(500).json({ msg: err?.message ?? 'Something went wrong' })
        }
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id
        try {
            memberServices.deleteById(id)
            return res.status(201).json({ msg: 'Member was successfully deleted' })
        } catch(err) {
            return res.status(500).json({ msg: err?.message ?? 'Something went wrong' })
        }
    }
}