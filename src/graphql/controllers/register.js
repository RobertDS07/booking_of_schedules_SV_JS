const Users = require('../../models/User')

async function RegisterController({nome, casa, whatsapp, senha}) {
    if (senha.length < 5) return new Error('Senha deve conter 5 caracteres ou mais')

    if(casa > 625) return new Error('Casa inválida...')

    const alredyInUse = await Users.findOne({whatsapp})

    if (!!alredyInUse) return new Error('Whatsapp já cadastrado')
}

module.exports = RegisterController