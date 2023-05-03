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

dotenv.config()
// teste
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem-vindo à nossa API!' })
})

app.post('/team/register/:id', async(req, res) => {
    const { name, username, password, confirmpassword, team_name } = req.body

    const id = req.params.id

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    
    const boss = (await Boss.get({ id }))[0]

    try {
        const team_leader = await boss.createTeamLeader({ name, username, password: passwordHash, team_name })
        res.status(201).json({msg: 'Equipe cadastrada com sucesso'})
    } catch (err) {
        console.log(err)
    }
})

app.get('/team', async(req, res) => {
    try {
        const teams = await TeamLeader.get()
        res.status(201).json(teams)
    } catch (err) {
        console.log(err)
    }
})

app.patch('/team/:id', async (req, res) => {
    const id = req.params.id

    let { name, moa, mpw } = req.body

    const team_leader = (await TeamLeader.get({ id }))[0] 
    console.log(team_leader.id)

    try {
        team_leader.update({ name, team_rules: { moa, mpw } })
        res.status(201).json('Atualizado com sucesso!')
    } catch(err) {
        console.log(err)
    }
})

app.delete('/team/:id', async (req, res) => {
    const id = req.params.id

    const team_leader = (await TeamLeader.get({ id }))[0] 
    console.log(team_leader.id)

    try {
        team_leader.delete()
        res.status(201).json('Atualizado com sucesso!')
    } catch(err) {
        console.log(err)
    }


})

app.post('/boss/register', async(req, res) => {
    const { name, username, password, confirmpassword, organization_name, moa, mpw } = req.body

    console.log('Entrei na rota')
    const salt = await bcrypt.genSalt(5)
    console.log(`salt: ${salt}`)
    const passwordHash = await bcrypt.hash(password, salt)
    console.log(`passHash: ${passwordHash}`)

    try {
        const boss = Boss.create({ name, username, password: passwordHash, organization_name, organization_rules: { moa, mpw } })
        res.status(201).json({msg: 'Usuársio cadastrado com sucesso'})
    } catch (err) {
        console.log(err)
    }

})

app.get('/boss', async(req, res) => {
    try {
        const bosses = await Boss.get()
        res.status(201).json(bosses)
    } catch (err) {
        console.log(err)
    }
})

app.patch('/boss/:id', async (req, res) => {
    const id = req.params.id

    let { name, moa, mpw } = req.body

    const boss = (await Boss.get({ id }))[0] 
    console.log(boss.id)

    if (!moa) {
        moa = boss.organization_rules.getMOA()
    }
    if (!mpw) {
        mpw = boss.organization_rules.getMPW()
    }

    try {
        boss.update({ name, organization_rules: { moa, mpw } })
        res.status(201).json('Atualizado com sucesso!')
    } catch(err) {
        console.log(err)
    }


})

app.delete('/boss/:id', async (req, res) => {
    const id = req.params.id

    const boss = (await Boss.get({ id }))[0] 
    console.log(boss.id)

    try {
        boss.delete()
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
    
    const team_leader = (await TeamLeader.get({ id }))[0]

    try {
        const member = await team_leader.createMember({ name, username, password: passwordHash })
        res.status(201).json({msg: 'Membro cadastrado com sucesso'})
    } catch (err) {
        console.log(err)
    }
})

app.get('/member', async(req, res) => {
    try {
        const members = await Member.get()
        res.status(201).json(members)
    } catch (err) {
        console.log(err)
    }
})

// app.patch('/team/:id', async (req, res) => {
//     const id = req.params.id

//     let { name, moa, mpw } = req.body

//     const team_leader = (await TeamLeader.get({ id }))[0] 
//     console.log(team_leader.id)

//     try {
//         team_leader.update({ name, team_rules: { moa, mpw } })
//         res.status(201).json('Atualizado com sucesso!')
//     } catch(err) {
//         console.log(err)
//     }
// })

// app.delete('/team/:id', async (req, res) => {
//     const id = req.params.id

//     const team_leader = (await TeamLeader.get({ id }))[0] 
//     console.log(team_leader.id)

//     try {
//         team_leader.delete()
//         res.status(201).json('Atualizado com sucesso!')
//     } catch(err) {
//         console.log(err)
//     }


// })


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
    .connect(`mongodb+srv://${dbUser}:${dbPass}@smartshiftdb.0ulhk4x.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(4000, () => console.log("Rodando na porta 4000..."))
        console.log('Conectou ao banco!')
    })
    .catch((err) => console.log(err))