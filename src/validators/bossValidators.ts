import { NextFunction, Request, Response } from "express";

export class BossValidators
{
    register(req: Request, res: Response, next: NextFunction) {
        const { name, username, password, confirm_password, organization_name, moa, mpw } = req.body

        if (!name || !username || !password || !confirm_password || !organization_name || !moa || !mpw) {
            return res.status(400).json({ msg: 'All fields are mandatory' })
        }

        if (password !== confirm_password) {
            return res.status(400).json({ msg: 'The passwords do not match' })
        }

        delete req.body.confirm_password
        delete req.body.moa
        delete req.body.mpw
        req.body.organization_rules = { moa, mpw }

        next()
    }

    get(req: Request, res: Response, next: NextFunction)  {
        if (Object.keys(req.body).length !== 0) {
            return res.status(400).json({ msg: 'There should not be any parameters' })
        }

        next()
    }

    getTeamLeaders(req: Request, res: Response, next: NextFunction)  {
        const id = req.params.id
        if (typeof id !== 'string') {
            return res.status(400).json({ msg: 'The id parameter is not in the correct form' })
        }
        
        if (Object.keys(req.body).length !== 0) {
            return res.status(400).json({ msg: 'There should not be any parameters' })
        }

        next()
    }

    changeOrganizationRules(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        if (typeof id !== 'string') {
            return res.status(400).json({ msg: 'The id parameter is not in the correct form' })
        }

        const { moa, mpw } = req.body
        if (!moa || !mpw) {
            return res.status(400).json({ msg: 'All fields are mandatory' })
        }

        next()
    }

    delete(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        if (typeof id !== 'string') {
            return res.status(400).json({ msg: 'The id parameter is not in the correct form' })
        }
        
        if (Object.keys(req.body).length !== 0) {
            return res.status(400).json({ msg: 'There should not be any parameters' })
        }

        next()
    }
}