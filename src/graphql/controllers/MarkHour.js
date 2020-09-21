const jwt = require('jsonwebtoken')

async function MarkHour({ produto, horario, token, dia }) {
    const product = require(`../../models/products/${produto}`)
    let erro
    let user

    jwt.verify(token, process.env.SECRET || 'hjasdhf873fb312', (err, decoded) => {
        !!err ? erro = 'Houve algo errado... Tente fazer login novamente.' : user = decoded
    })
    if (!!erro) return new Error(erro)

    await product.findOneAndUpdate({
        dia,
        'quemQuando': {
            '$elemMatch': {
                'hora': horario
            }
        }
    }, {
        'quemQuando.$.disponivel': false,
        'quemQuando.$.whatsapp': user.user.whatsapp
    }, {
        new: true
    })

    return 'Succes: Horário marcado com sucesso, qualquer dúvida contatar no whatsapp.'
}

module.exports = MarkHour