const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

// <---------------- Alterado por gemini: Importar o nosso "Porteiro"
const verifyToken = require('../middlewares/authMiddleware');

// <---------------- Alterado por gemini: Rotas Protegidas
// Adicionámos 'verifyToken' como segundo argumento nas rotas perigosas.

// Qualquer um pode ver a lista (Público)
router.get('/', alunoController.listarAlunos);

// SÓ ADMINS (com token) podem mexer nos dados
router.post('/', verifyToken, alunoController.criarAluno);
router.put('/:id', verifyToken, alunoController.atualizarAluno);
router.delete('/:id', verifyToken, alunoController.apagarAluno);

module.exports = router;