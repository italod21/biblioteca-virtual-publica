const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    senha: {
        type: String,
        required: true,
    },
    confirmado: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);