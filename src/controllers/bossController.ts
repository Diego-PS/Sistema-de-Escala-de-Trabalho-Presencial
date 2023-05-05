import { Request, Response } from "express";
import { IBossServices } from "../services/bossServices";
import { Boss } from "../entities/Boss";
import bcrypt from "bcrypt";
import { User } from "../entities/User";
import { userServices } from "../services/userServices";
import { bossServices } from "../services";
import { userRepository } from "../repositories";
import { Rules } from "../abstractions/Rules";

export class BossController
{
    constructor(public services: IBossServices) {}
    
    async register(req: Request, res: Response) {
        try {
            const boss = await Boss.create(req.body)
            res.status(201).json({ msg: 'Organization succesufully registered' })
        } catch (err) {
            res.status(500).json({ msg: err?.message ?? 'Something went wrong' })
        }
    }

    async get(req: Request, res: Response) {
        try {
            const bosses = await Boss.getAll()
            return res.status(201).json(bosses)
        } catch (err) {
            res.status(500).json({ msg: err?.message ?? 'Something went wrong' })
        }
    }

    async getTeamLeaders(req: Request, res: Response) {
        const id = req.params.id
        try {
            const boss = await Boss.getById(id)
            const teamLeaders = await boss.getTeamLeaders() 
            return res.status(201).json(teamLeaders)
        } catch (err) {
            res.status(500).json({ msg: err?.message ?? 'Something went wrong' })
        }
    }

    async changeOrganizationRules(req: Request, res: Response) {
        const id = req.params.id
        try {
            const boss = Boss.getById(id)
            await (await boss).changeOrganizationRules(req.body.organization_rules)
            res.status(201).json({ msg: 'Atualizado com sucesso'})
        } catch(err) {
            res.status(500).json({ msg: err?.message ?? 'Something went wrong' })
        }
        
    }
}

export const bossController = new BossController(bossServices)