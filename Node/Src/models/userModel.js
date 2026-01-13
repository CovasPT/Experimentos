const db = require('../config/db');

const UserModel = {
    
    // <---------------- Alterado por gemini: Encontrar utilizador pelo email (Usado no Login)
    async findByEmail(email) {
        // Retorna o primeiro resultado encontrado (limit 1)
        const [rows] = await db.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
        return rows[0];
    },

    // <---------------- Alterado por gemini: Criar novo Admin (Usado no Registo)
    async create(email, passwordHash) {
        const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
        const [result] = await db.query(sql, [email, passwordHash]);
        return result.insertId;
    }
};

module.exports = UserModel;