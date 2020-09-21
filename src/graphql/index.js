const { buildSchema } = require('graphql')
const bcrypt = require('bcryptjs')

const RegisterController = require('./controllers/register')
const CreateJwt = require('./controllers/CreateJwt')
const Users = require('../models/User')
// const PingPong = require('../models/products/PingPong')
// const Bike = require('../models/products/Bike')
// const FlaFlu = require('../models/products/FlaFlu')
const CheckTimesController = require('./controllers/CheckTimes')
const MarkHourController = require('./controllers/MarkHour')

const schema = buildSchema(`
    type Query {
        login(whatsapp: Int!, senha: String!) : ID
    }

    type Mutation {
        register(nome: String!, casa: Int!, whatsapp: Int!, senha: String!): ID
        checkTimes(horarios: [String!], produto: String!, dia: String!) : [String]
        markHour(produto: String!, horario: String!, token: ID!, dia: String!) : String
    }
`)

const resolvers = {
    register: async (args) => {
        const responseError = await RegisterController(args)

        if (!!responseError) return responseError

        const user = await Users.create(args)
        user.senha = undefined

        // const token = CreateJwt(user)
        const token = '123456'

        return token
    },

    login: async ({whatsapp, senha}) => {
        const user = await Users.findOne({whatsapp}).select('+senha')

        if(!user || !await bcrypt.compare(senha, user.senha)) return new Error('Credenciais invalidas')

        user.senha = undefined
        // const token = CreateJwt(user)
        const token = '123456'

        return token
    },

    checkTimes: async (args) => {
        const horarios = await CheckTimesController(args)

        return horarios
    },

    markHour: async (args) => {
        const response = await MarkHourController(args)

        return response
    }
}

module.exports = schema
module.exports = resolvers