const mongoose = require('mongoose')

const resolvers = require('../src/graphql/index')
const User = require('../src/models/User')

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/devTest', ({
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }), () => console.log('db connected'))
})

describe('Login/Register', () => {
    it('deve retornar um erro caso a senha tenha menos de 5 caracteres', async() => {
        expect(await resolvers.register({ nome: "Robert", casa: 12, whatsapp: 984712615, senha: "1234" })).toStrictEqual(Error('Senha deve conter 5 caracteres ou mais'))
    })
    it('deve retornar um token caso o cadastro seja um sucesso', async() => {
        expect(await resolvers.register({ nome: "Robert", casa: 12, whatsapp: 984712615, senha: "123456" })).toStrictEqual(('123456'))
    })
    it('deve retornar um erro caso o whatsapp já esteja sendo utilizado', async() => {
        expect(await resolvers.register({ nome: "Robert", casa: 12, whatsapp: 984712615, senha: "123456" })).toStrictEqual(Error('Whatsapp já cadastrado'))
    })
    it('deve retornar um erro caso o o número da casa exceda o máximo de 625', async() => {
        expect(await resolvers.register({ nome: "Robert", casa: 626, whatsapp: 9184712615, senha: "123456" })).toStrictEqual(Error('Casa inválida...'))
    })
    it('deve retornar um token caso o login seja um sucesso', async() => {
        expect(await resolvers.login({ whatsapp: 984712615, senha: "123456" })).toStrictEqual(('123456'))
    })
    it('deve retornar um erro caso o login falhe', async() => {
        expect(await resolvers.login({ whatsapp: 984712615, senha: "1234567" })).toStrictEqual(Error('Credenciais invalidas'))
    })
})

describe('Regras de negócio', () => {
    it('deve receber um array de horarios, um produto e um dia que ainda não tenha sido marcado para o programa criar todos horarios certinhos. E dps retornar todos horarios de volta pois não há nenhum agendado ainda.', () => {
        const horarios = ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00']
        expect( resolvers.checkTimes({ produto: "flaFlu", horarios, day: '16/09/2020' })).toStrictEqual(horarios)
    })
    it('Deve receber um horario especifico, um token para pegar as infos do usuario, um produto e retornar uma msg de sucesso para o usuario', () => {
        expect( resolvers.markHour({ produto: "flaFlu", horario: '13:00', token: '123456', day: "16/09/2020" })).toStrictEqual('Succes: Horário marcado com sucesso, qualquer dúvida contatar no whatsapp.')
    })
    it('Deve receber um array de horarios e retornar apenas os disponiveis', () => {
        const horarios = ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00']
        const horariosRes = ['13:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00']
        expect( resolvers.checkTimes({ produto: "flaFlu", horarios, day: '16/09/2020' })).toStrictEqual(horariosRes)
    })
})



afterAll(async() => {
    await User.deleteMany({})
    await mongoose.disconnect()
})