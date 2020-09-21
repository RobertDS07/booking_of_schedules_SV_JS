const { buildSchema } = require('graphql')
const bcrypt = require('bcryptjs')

const RegisterController = require('./controllers/register')
const Users = require('../models/User')

const schema = buildSchema(`
    type Query {
        login(whatsapp: Int!, senha: String!) : ID
    }

    type Mutation {
        register(nome: String!, casa: Int!, whatsapp: Int!, senha: String!): ID
    }
`)

const resolvers = {
    register: async (args) => {
        const responseError = await RegisterController(args)

        if (!!responseError) return responseError

        const user = await Users.create(args)

        // criar jwt com dados do usuario

        const token = '123456'

        return token
    },

    login: async ({whatsapp, senha}) => {
        const user = await Users.findOne({whatsapp}).select('+senha')

        if(!user || !await bcrypt.compare(senha, user.senha)) return new Error('Credenciais invalidas')

        const token = '123456'

        return token
    }
}

module.exports = schema
module.exports = resolvers