import { Request, Response } from "express";
import { IBossServices } from "../services/bossServices";
import { Boss } from "../entities/Boss";
import { bossServices } from "../services";

export class BossController
{
    constructor(public services: IBossServices) {}
    
    async register(req: Request, res: Response) {
        try {
            const boss = await Boss.create(req.body)
            return res.status(201).json({ msg: 'Organization succesufully registered' })
        } catch(err) {
            return res.status(500).json({ msg: err?.message ?? 'Something went wrong' })
        }
    }

    async get(req: Request, res: Response) {
        try {
            const bosses = await Boss.getAll()
            const bosses_response = []
            for (const boss of bosses) {
                const team_leaders = await boss.getTeamLeaders()
                const num_of_teams = team_leaders.length
                bosses_response.push({ ...boss, num_of_teams })
            }
            return res.status(201).json(bosses_response)
        } catch(err) {
            return res.status(500).json({ msg: err?.message ?? 'Something went wrong' })
        }
    }

    async getTeamLeaders(req: Request, res: Response) {
        const id = req.params.id
        try {
            const boss = await Boss.getById(id)
            const team_leaders = await boss.getTeamLeaders() 
            const team_leaders_response = []
            for (const team_leader of team_leaders) {
                const members = await team_leader.getMembers()
                const num_of_members = members.length
                team_leaders_response.push({ ...team_leader, num_of_members })
            }
            return res.status(201).json(team_leaders_response)
        } catch(err) {
            return res.status(500).json({ msg: err?.message ?? 'Something went wrong' })
        }
    }

    async changeOrganizationRules(req: Request, res: Response) {
        const id = req.params.id
        try {
            const boss = await Boss.getById(id)
            await boss.changeOrganizationRules(req.body)
            return res.redirect('/equipes_regras.html')
            return res.status(201).json({ msg: 'Organization rules successfully updated'})
        } catch(err) {
            return res.status(500).json({ msg: err?.message ?? 'Something went wrong' })
        }
        
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id
        try {
            bossServices.deleteById(id)
            return res.status(201).json({ msg: 'Organization and its boss account successfully deleted' })
        } catch(err) {
            return res.status(500).json({ msg: err?.message ?? 'Something went wrong' })
        }
    }
}