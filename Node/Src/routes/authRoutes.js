const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// <---------------- Alterado por gemini: Rotas públicas para Login e Registo
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;