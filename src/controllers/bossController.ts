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
        const { name, username, password, confirm_password, organization_name, moa, mpw } = req.body

        console.log('Entra no rota')
        if (!name || !username || !password || !confirm_password || !organization_name || !moa || !mpw) {
            return res.status(400).json({ msg: 'Todos os campos são obrigatórios' })
        }
        console.log('Verificou se os campos existem')

        if (password !== confirm_password) {
            return res.status(400).json({ msg: 'As senhas não coincidem' })
        }
        console.log('Verificou se as senhas conferem')

        if (await userServices.getByUsername(username)) {
            return res.status(400).json({ msg: 'Já existe um usuário com este username' })
        }
        console.log('Verificou se o username já existe')

        const salt = await bcrypt.genSalt(5)
        const passwordHash = await bcrypt.hash(password, salt)
        console.log('Criou hash para a senha')

        try {
            const boss = Boss.create({
                name,
                username,
                password: passwordHash,
                organization_name,
                organization_rules: {
                    moa, mpw
                }
            })
            res.status(201).json({ msg: 'Chefe cadastrado com sucesso' })
        } catch (err) {
            console.log(err)
        }
    }

    async get(req: Request, res: Response) {
        try {
            const bosses = await Boss.getAll()
            return res.status(201).json(bosses)
        } catch (err) {
            console.log(err)
        }
    }

    async getTeamLeaders(req: Request, res: Response) {
        const id = req.params.id
        const boss = await Boss.getById(id)
        try {
            const teamLeaders = await boss.getTeamLeaders() 
            return res.status(201).json(teamLeaders)
        } catch (err) {
            console.log(err)
        }
    }

    async changeOrganizationRules(req: Request, res: Response) {
        const id = req.params.id
        const { moa, mpw } = req.body

        try {
            const new_rules = new Rules(moa, mpw)
        } catch(err) {
            console.log(err)
            return res.status(201).json({ msg: 'problema' }) 
        }
        const boss = await Boss.getById(id)

        try {
            await boss.update({ organization_rules: { moa, mpw }})
            res.status(201).json({ msg: 'Atualizado com sucesso'})
        } catch(err) {
            console.log(err)
        }
        
    }
}

export const bossController = new BossController(bossServices)