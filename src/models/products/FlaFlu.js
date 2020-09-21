const mongoose = require('mongoose')

const quemQuando = mongoose.Schema({
    hora: {
        type: String,
        required: true
    },
    disponivel: {
        type: Boolean,
        default: true
    },
    whatsapp: {
        type: Number
    },
}, {_id: false})

const Schema = mongoose.Schema({
    dia: {
        type: String,
        required: true
    },
    quemQuando: {
        type: [quemQuando],
        default: [{
            hora: '13:00', 
            disponivel: true,
        },
        {
            hora: '13:30', 
            disponivel: true,
        },
        {
            hora: '14:00', 
            disponivel: true,
        },
        {
            hora: '14:30', 
            disponivel: true,
        },
        {
            hora: '15:00', 
            disponivel: true,
        },
        {
            hora: '15:30', 
            disponivel: true,
        },
        {
            hora: '16:00', 
            disponivel: true,
        },
        {
            hora: '16:30', 
            disponivel: true,
        },
        {
            hora: '17:00', 
            disponivel: true,
        },
        {
            hora: '17:30', 
            disponivel: true,
        },
        {
            hora: '18:00', 
            disponivel: true,
        }
    ],}
})

const FlaFlu = mongoose.model('FlaFlu', Schema)

module.exports = FlaFlu