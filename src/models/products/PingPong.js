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
        type: Number
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

const PingPong = mongoose.model('PingPong', Schema)

module.exports = PingPong