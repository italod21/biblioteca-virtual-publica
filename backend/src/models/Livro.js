const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  genero: { type: String, required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Livro', livroSchema);
