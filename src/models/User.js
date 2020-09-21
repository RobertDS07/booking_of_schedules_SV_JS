const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = new mongoose.Schema({
    nome: {
        type: String,
        required:true
    },
    casa: {
        type: Number,
        required: true
    },
    whatsapp: {
        type: Number,
        unique: true,
        required: true
    },
    senha: {
        type: String,
        required: true,
        select: false,
    }
})

Schema.pre('save', async function() {
    this.senha = await bcrypt.hash(this.senha, 10)
})

const User = mongoose.model('Users', Schema)

module.exports = User