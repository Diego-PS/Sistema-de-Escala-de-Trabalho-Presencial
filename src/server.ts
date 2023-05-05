import { app } from "./app";
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserDB, userSchema } from "./database/models/UserDB";
import { User } from "./entities/User";
import { Boss, IBoss } from "./entities/Boss";
import { IRoute } from "express";
import { TeamLeader } from "./entities/TeamLeader";
import { Member } from "./entities/Member";
import { BossServices } from "./services/bossServices";
import { bossServices, memberServices, teamLeaderServices } from "./services";
import { bossController } from "./controllers/bossController";
import { bossValidators } from "./validators/bossValidators";

dotenv.config()
// teste
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem-vindo à nossa API!' })
})

app.post('/team/register/:id', async(req, res) => {
    const { name, username, password, team_name } = req.body

    const id = req.params.id

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    
    const boss = await bossServices.getById(id)
    console.log(boss)

    try {
        const team_leader_object = new TeamLeader({ name, username, password, team_name, boss_id: id, team_rules: { moa: boss.organization_rules.getMOA(), mpw: boss.organization_rules.getMPW() }})
        const team_leader = await teamLeaderServices.create(team_leader_object)
        res.status(201).json({msg: 'Equipe cadastrada com sucesso'})
    } catch (err) {
        console.log(err)
    }
})

app.get('/team', async(req, res) => {
    try {
        const teams = await teamLeaderServices.getAll()
        res.status(201).json(teams)
    } catch (err) {
        console.log(err)
    }
})

app.patch('/team/:id', async (req, res) => {
    const id = req.params.id

    let { name, moa, mpw } = req.body

    try {
        await teamLeaderServices.update(id, { name, team_rules: { moa, mpw } })
        res.status(201).json('Atualizado com sucesso!')
    } catch(err) {
        console.log(err)
    }
})

app.delete('/team/:id', async (req, res) => {
    const id = req.params.id

    try {
        await teamLeaderServices.deleteById(id)
        res.status(201).json('Atualizado com sucesso!')
    } catch(err) {
        console.log(err)
    }


})

app.post('/boss/register', bossValidators.register, bossController.register)

app.get('/boss', bossValidators.get, bossController.get)

app.get('/boss/teamleaders/:id', bossValidators.getTeamLeaders, bossController.getTeamLeaders)

app.get('/boss/changerules/:id', bossValidators.changeOrganizationRules, bossController.changeOrganizationRules)

app.patch('/boss/:id', async (req, res) => {
    const id = req.params.id

    let { name, moa, mpw } = req.body

    const boss = await bossServices.getById(id)
    console.log(boss.id)

    if (!moa) {
        moa = boss.organization_rules.getMOA()
    }
    if (!mpw) {
        mpw = boss.organization_rules.getMPW()
    }

    try {
        bossServices.update(boss.id, { name, organization_rules: { moa, mpw } })
        res.status(201).json('Atualizado com sucesso!')
    } catch(err) {
        console.log(err)
    }


})

app.delete('/boss/:id', async (req, res) => {
    const id = req.params.id

    try {
        bossServices.deleteById(id)
        res.status(201).json('Atualizado com sucesso!')
    } catch(err) {
        console.log(err)
    }


})

// RotasMember
app.post('/member/register/:id', async(req, res) => {
    const { name, username, password } = req.body

    const id = req.params.id

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    
    const team_leader = await teamLeaderServices.getById(id)
    const member_object = new Member({ name, username, password, team_leader_id: id, desired_schedule: { mon: true, tue: true, wed: true, thu: true, fri: true }, actual_schedule: { mon: true, tue: true, wed: true, thu: true, fri: true }})

    try {
        const member = await memberServices.create(member_object)
        res.status(201).json({msg: 'Membro cadastrado com sucesso'})
    } catch (err) {
        console.log(err)
    }
})

app.get('/member', async(req, res) => {
    try {
        const members = await memberServices.getAll()
        res.status(201).json(members)
    } catch (err) {
        console.log(err)
    }
})

app.patch('/member/:id', async (req, res) => {
    const id = req.params.id

    const { name, mon, tue, wed, thu, fri } = req.body
    

    try {
        await memberServices.update(id, { name, desired_schedule: { mon, tue, wed, thu, fri }})
        res.status(201).json('Atualizado com sucesso!')
    } catch(err) {
        console.log(err)
    }
})

app.delete('/member/:id', async (req, res) => {
    const id = req.params.id

    try {
        await memberServices.deleteById(id)
        res.status(201).json('Atualizado com sucesso!')
    } catch(err) {
        console.log(err)
    }


})


// Register User
app.post('/auth/register', async(req, res) => {
    // public name: string
    // public username: string
    // public password: string
    // public role: string
    const { name, username, password, confirmpassword, role } = req.body

    // validations
    if (!name) {
        return res.status(422).json({ msg: 'O nome é obrigatório!' })
    }
    if (!username) {
        return res.status(422).json({ msg: 'O username é obrigatório!' })
    }
    if (!password) {
        return res.status(422).json({ msg: 'O password é obrigatório!' })
    }
    if (!confirmpassword) {
        return res.status(422).json({ msg: 'O confirmpassword é obrigatório!' })
    }
    if (!role) {
        return res.status(422).json({ msg: 'O role é obrigatório!' })
    }
    if (password != confirmpassword) {
        return res.status(422).json({ msg: 'As senhas não conferem' })
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({ name, username, password: passwordHash, role })

    const userDB = new UserDB({
        id: user.id,
        name,
        username,
        password: passwordHash,
        role
    })

    try {
        await userDB.save()
        res.status(201).json({msg: 'Usuársio cadastrado com sucesso'})
    } catch(err) {
        res.status(500).json({msg: err})
    }
})

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPass}@smartshiftdb.aixb2uu.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(4000, () => console.log("Rodando na porta 4000..."))
        console.log('Conectou ao banco!')
    })
    .catch((err) => console.log(err))