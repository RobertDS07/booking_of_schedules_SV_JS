import mongoose from 'mongoose'
import {resolvers} from '../src/graphql/index'

beforeAll(async() => {
    await mongoose.connect('mongodb://localhost:27017/devTest', ({
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }), () => console.log('db connected'))
})

describe('Login/Register', () => {
    it('deve retornar um erro caso a senha tenha menos de 5 caracteres', () => {
        expect(resolvers.register({nome:"Robert", casa:12, whatsapp:984712615, senha:"1234"})).toStrictEqual(Error('Senha deve conter 5 caracteres ou mais'))
    })
    it('deve retornar um token caso o cadastro seja um sucesso', () => {
        expect(resolvers.register({nome:"Robert", casa:12, whatsapp:984712615, senha:"123456"})).toStrictEqual(('123456'))
    })
    it('deve retornar um token caso o login seja um sucesso', () => {
        expect(resolvers.login({whatsapp:984712615, senha:"123456"})).toStrictEqual(('123456'))
    })
    it('deve retornar um erro caso o whatsapp já esteja sendo utilizado', () => {
        expect(resolvers.register({nome:"Robert", casa:12, whatsapp:984712615, senha:"123456"})).toStrictEqual(Error('Whatsapp já cadastrado'))
    })
    it('deve retornar um erro caso o o número da casa exceda o máximo de 625', () => {
        expect(resolvers.register({nome:"Robert", casa:626, whatsapp:9184712615, senha:"123456"})).toStrictEqual(Error('Whatsapp já cadastrado'))
    })
})

describe('Regras de negócio', () => {
    it('deve receber um array de horarios, um produto e um dia que ainda não tenha sido marcado para o programa criar todos horarios certinhos. E dps retornar todos horarios de volta pois não há nenhum agendado ainda.', () => {

    })
    it('Deve receber um horario especifico, um token para pegar as infos do usuario, um produto e retornar uma msg de sucesso para o usuario', () => {
        
    })
    it('Deve receber um array de horarios e retornar apenas os disponiveis', () => {

    })
})



afterAll(() => {
    mongoose.disconnect()
})