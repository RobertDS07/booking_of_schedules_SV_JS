const mongoose = require('mongoose')

const quemQuando = mongoose.Schema({
    hora: {
        type: String,
        required: true
    },
    disponivel: {
        type: Boolean,
        default: false
    },
    whatsapp: {
        type: Number,
        required: true
    }
})

const Schema = mongoose.Schema({
    dia: {
        type: String,
        required: true
    },
    quemQuando: {
        type: [quemQuando],
        default: [],

    }
})

const FlaFlu = mongoose.model('FlaFlu', Schema)

module.exports = FlaFlu