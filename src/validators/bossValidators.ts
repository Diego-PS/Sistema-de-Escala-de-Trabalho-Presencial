import { NextFunction, Request, Response } from "express";
import { Rules } from "../abstractions/Rules";

export class BossValidators
{
    async register(req: Request, res: Response, next: NextFunction) {
        const { name, username, password, confirm_password, organization_name, moa, mpw } = req.body

        if (!name || !username || !password || !confirm_password || !organization_name || !moa || !mpw) {
            return res.status(400).json({ msg: 'All fields are mandatory' })
        }

        if (password !== confirm_password) {
            return res.status(400).json({ msg: 'The passwords do not match' })
        }

        if (!(new Rules({ moa, mpw }))) {
            return res.status(400).json({ msg: 'The rules do not satisfy the constraints' })
        }

        delete req.body.confirm_password
        delete req.body.moa
        delete req.body.mpw
        req.body.organization_rules = { moa, mpw }

        next()
    }

    async get(req: Request, res: Response, next: NextFunction)  {
        if (req.body !== undefined) {
            return res.status(400).json({ msg: 'There should not be any parameters' })
        }

        next()
    }

    async getTeamLeaders(req: Request, res: Response, next: NextFunction)  {
        const id = req.params.id
        if (typeof id !== 'string') {
            return res.status(400).json({ msg: 'The id parameter is not in the correct form' })
        }
        
        if (req.body !== undefined) {
            return res.status(400).json({ msg: 'There should not be any parameters' })
        }

        next()
    }

    async changeOrganizationRules(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        if (typeof id !== 'string') {
            return res.status(400).json({ msg: 'The id parameter is not in the correct form' })
        }

        const { moa, mpw } = req.body
        if (!moa || !mpw) {
            return res.status(400).json({ msg: 'All fields are mandatory' })
        }

        delete req.body.moa
        delete req.body.mpw
        req.body.organization_rules = { moa, mpw }

        next()
    }
}

export const bossValidators = new BossValidators()