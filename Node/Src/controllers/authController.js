const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authController = {

    // 1. Registar um novo Admin
    register: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email e Password são obrigatórios!' });
        }

        try {
            // Verificar se já existe
            const userExists = await UserModel.findByEmail(email);
            if (userExists) {
                return res.status(409).json({ message: 'Email já registado.' });
            }

            // <---------------- Alterado por gemini: Encriptar a password antes de salvar
            // O '10' é o custo do processamento (Salt), quanto maior, mais seguro e lento.
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await UserModel.create(email, hashedPassword);

            return res.status(201).json({ message: 'Administrador registado com sucesso!' });

        } catch (error) {
            return res.status(500).json({ message: 'Erro no servidor.' });
        }
    },

    // 2. Fazer Login
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            // A. Verificar se o user existe
            const user = await UserModel.findByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Email ou password incorretos.' });
            }

            // B. Comparar a password que veio do site com a encriptada na BD
            const passwordMatch = await bcrypt.compare(password, user.password);
            
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Email ou password incorretos.' });
            }

            // <---------------- Alterado por gemini: Gerar o Token (O "Crachá")
            // Este token contém o ID do user e tem validade de 1 hora.
            // Precisamos de definir uma chave secreta no .env!
            const token = jwt.sign(
                { id: user.id, email: user.email }, 
                process.env.JWT_SECRET || 'segredo_super_secreto', 
                { expiresIn: '1h' }
            );

            return res.json({ message: 'Login com sucesso!', token: token });

        } catch (error) {
            return res.status(500).json({ message: 'Erro ao fazer login.' });
        }
    }
};

module.exports = authController;