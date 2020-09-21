async function CheckTimes({ produto, dia }) {
    const product = require(`../../models/products/${produto}`)

    const alredyHave = await product.findOne({ dia })

    if (!alredyHave) {
        await product.create({
            dia
        })
        const horarios = ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00']
        return horarios
    }

    const horariosRes = []
    alredyHave.quemQuando.forEach(e => {
        if (e.disponivel === true) horariosRes.push(e.hora)
    })

    return horariosRes
}

module.exports = CheckTimes