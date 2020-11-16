import Express from 'express'
import bodyParser from 'body-parser'

import database from './config/database'

import {
    verifyToken,
    protectRoute
} from './middlewares/auth'
import { generateToken } from './services/auth'
import UserModel from './models/users'

const app = Express()
const port = 3000

app.set('json spaces', 2);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(verifyToken)

app.get('/', (req, res) => res.send('Olá mundo pelo Express!'))

app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find()
        res.send({ users })
    } catch (error) {
        res.status(400).send({ error: 'Falha ao obter o usuário.' })
    }
})

app.post('/users', async (req, res) => {
    try {
        const user = new UserModel(req.body)
        await user.save()

        res.status(201).send('Ok')
    } catch (error) {
        res.send(error)
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body

    const user = await UserModel.findOne({username})

    if (username !== user.username || password !== user.password) {
        return res.status(400).send({ error: 'Usuário ou senha inválidos!' })
    }    

    const payload = {
        sub: user.id,
        name: user.name,
        roles: [user.role]
    }
    const token = generateToken(payload)

    res.send({
        token
    })
})

app.get('/protected', protectRoute, (req, res) => res.send(req.decoded))


database.connect().then(() => {
    app.listen(port, () => console.log('Api rodando na porta 3000'))
})