async function CheckTimes({ produto, horarios, dia }) {
    const product = require(`../../models/products/${produto}`)

    const alredyHave = await product.findOne({ dia })

    if (!alredyHave) {
        const atualProduct = await product.create({
            dia
        })
        return horarios
    }

    const horariosRes = []
    alredyHave.quemQuando.forEach(e => {
        if (e.disponivel === true) horariosRes.push(e.hora)
    })

    return horariosRes
}

module.exports = CheckTimes