import { Request, Response, NextFunction } from "express";

export class MemberValidators
{
    register(req: Request, res: Response, next: NextFunction) {
        const { name, username, password, confirm_password } = req.body

        if (!name || !username || !password || !confirm_password ) {
            return res.status(400).json({ msg: 'All fields are mandatory' })
        }

        if (password !== confirm_password) {
            return res.status(400).json({ msg: 'The passwords do not match' })
        }

        next()
    }

    get(req: Request, res: Response, next: NextFunction)  {
        if (Object.keys(req.body).length !== 0) {
            return res.status(400).json({ msg: 'There should not be any parameters' })
        }

        next()
    }

    changeDesiredSchedule(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        if (typeof id !== 'string') {
            return res.status(400).json({ msg: 'The id parameter is not in the correct form' })
        }

        const new_schedule = req.body
        for (const day of ['mon', 'tue', 'wed', 'thu', 'fri']) {
            if (!Object.keys(new_schedule).includes(day)) {
                return res.status(400).json({ msg: `The schedule for ${day} must be included`})
            }

            if (typeof new_schedule[day] !== 'boolean') {
                return res.status(400).json({ msg: 'The schedule for a day must be a boolean' })
            }
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