import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

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

Schema.pre('save', async() => {
    this.senha = await bcrypt.hash(this.senha, 10)
})

export const User = mongoose.model('Users', Schema)