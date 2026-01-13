const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

// <---------------- Alterado por gemini: Definição das Rotas RESTful
// GET /api/alunos      -> Lista todos
// POST /api/alunos     -> Cria um novo
// PUT /api/alunos/:id  -> Atualiza (precisa do ID)
// DELETE /api/alunos/:id -> Apaga (precisa do ID)

router.get('/', alunoController.listarAlunos);
router.post('/', alunoController.criarAluno);
router.put('/:id', alunoController.atualizarAluno);
router.delete('/:id', alunoController.apagarAluno);

module.exports = router;