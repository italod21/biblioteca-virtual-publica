const Livro = require('../models/Livro');

// 📚 Criar livro
const criarLivro = async (req, res) => {
  try {
    const { titulo, autor, genero } = req.body;

    const novoLivro = new Livro({
      titulo,
      autor,
      genero,
      usuario: req.user.id, // do token
    });

    await novoLivro.save();
    res.status(201).json({ mensagem: 'Livro criado com sucesso!', livro: novoLivro });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar livro', erro: error.message });
  }
};

// 🔍 Buscar livros (todos ou por filtros)
const buscarLivros = async (req, res) => {
  try {
    const { titulo, autor, genero } = req.query;

    const filtro = {};

    if (titulo) filtro.titulo = new RegExp(titulo, 'i');
    if (autor) filtro.autor = new RegExp(autor, 'i');
    if (genero) filtro.genero = new RegExp(genero, 'i');

    const livros = await Livro.find(filtro).populate('usuario', 'nome email');
    res.status(200).json(livros);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar livros', erro: error.message });
  }
};

// ✏️ Atualizar livro (apenas se for o dono)
const atualizarLivro = async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);

    if (!livro) return res.status(404).json({ mensagem: 'Livro não encontrado' });

    if (livro.usuario.toString() !== req.user.id) {
      return res.status(403).json({ mensagem: 'Você não tem permissão para editar este livro' });
    }

    const { titulo, autor, genero } = req.body;
    livro.titulo = titulo || livro.titulo;
    livro.autor = autor || livro.autor;
    livro.genero = genero || livro.genero;

    await livro.save();

    res.status(200).json({ mensagem: 'Livro atualizado com sucesso', livro });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar livro', erro: error.message });
  }
};

// 🗑️ Deletar livro (apenas se for o dono)
const deletarLivro = async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);

    if (!livro) return res.status(404).json({ mensagem: 'Livro não encontrado' });

    if (livro.usuario.toString() !== req.user.id) {
      return res.status(403).json({ mensagem: 'Você não tem permissão para deletar este livro' });
    }

    await livro.remove();

    res.status(200).json({ mensagem: 'Livro deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar livro', erro: error.message });
  }
};

module.exports = {
  criarLivro,
  buscarLivros,
  atualizarLivro,
  deletarLivro,
};
