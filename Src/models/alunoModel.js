const db = require('../config/db');

// <---------------- Alterado por gemini: Criamos uma classe 'AlunoModel' para agrupar as operações de BD.
// Isto mantém o código organizado, similar a um Repository no Java.
const AlunoModel = {
    
    // 1. Listar todos os alunos
    async getAll() {
        // O 'db.query' retorna um array [rows, fields], por isso usamos a desestruturação [rows]
        const [rows] = await db.query('SELECT * FROM alunos');
        return rows;
    },

    // 2. Criar um novo aluno
    async create(aluno) {
        const sql = 'INSERT INTO alunos (nome, email, curso, ano_conclusao, empregado, empresa_atual) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [aluno.nome, aluno.email, aluno.curso, aluno.ano_conclusao, aluno.empregado, aluno.empresa_atual];
        
        const [result] = await db.query(sql, values);
        return { id: result.insertId, ...aluno };
    },

    // 3. Atualizar aluno
    async update(id, aluno) {
        const sql = 'UPDATE alunos SET nome=?, email=?, curso=?, ano_conclusao=?, empregado=?, empresa_atual=? WHERE id=?';
        const values = [aluno.nome, aluno.email, aluno.curso, aluno.ano_conclusao, aluno.empregado, aluno.empresa_atual, id];
        
        const [result] = await db.query(sql, values);
        return result.affectedRows > 0; // Retorna true se alterou alguma linha
    },

    // 4. Apagar aluno
    async delete(id) {
        const [result] = await db.query('DELETE FROM alunos WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
};

module.exports = AlunoModel;