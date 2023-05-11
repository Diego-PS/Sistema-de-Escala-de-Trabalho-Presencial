import { NextFunction, Request, Response } from "express";

export class TeamLeaderValidators
{
    async register(req: Request, res: Response, next: NextFunction) {
        const { name, username, password, confirm_password, team_name } = req.body

        if (!name || !username || !password || !confirm_password || !team_name) {
            return res.status(400).json({ msg: 'All fields are mandatory' })
        }

        if (password != confirm_password) {
            return res.status(400).json({ msg: 'The passwords do not match' })
        }

        delete req.body.confirm_password
    
        next()
    }

    async get(req: Request, res: Response, next: NextFunction) {
        if (Object.keys(req.body).length !== 0) {
            return res.status(400).json({ msg: 'There should not be any parameters' })
        }

        next()
    }

    async getMembers(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        if (typeof id !== 'string') {
            return res.status(400).json({ msg: 'The id parameter is not in the correct form' })
        }
        
        if (Object.keys(req.body).length !== 0) {
            return res.status(400).json({ msg: 'There should not be any parameters' })
        }

        next()
    }

    async changeTeamSchedule(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        if (typeof id !== 'string') {
            return res.status(400).json({ msg: 'The id parameter is not in the correct form' })
        }

        const team_schedule = req.body
        Object.keys(req.body).forEach(username => {
            if (typeof id !== 'string') {
                return res.status(400).json({ msg: 'The username is not in the correct form' })
            }
            Object.keys(req.body[username]).forEach(week_day => {
                if (!['mon', 'tue', 'wed', 'thu', 'fri'].includes(week_day)) {
                    return res.status(400).json({ msg: 'The schedule is not in the correct form' })
                }
                if (typeof req.body[username][week_day] !== 'boolean') {
                    return res.status(400).json({ msg: 'The value must be a boolean, either true or false' })
                }
            })
        })

        next()
    }

    async changeTeamRules(req: Request, res: Response, next: NextFunction) {
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

    async delete(req: Request, res: Response, next: NextFunction) {
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