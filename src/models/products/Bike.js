import mongoose from 'mongoose'

const quemQuando = mongoose.Schema({
    hora: {
        type: String,
        required: true
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

export const Bike = mongoose.model('Bike', Schema)