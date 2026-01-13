const express = require('express');
const db = require('./config/db'); 
const dotenv = require('dotenv');
// <---------------- Alterado por gemini: Importar as rotas de alunos
const alunoRoutes = require('./routes/alunoRoutes'); 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/alunos', alunoRoutes);

app.get('/', (req, res) => {
    res.send('API de Gestão de Alunos a funcionar!');
});

app.listen(PORT, async () => {
    console.log(`Servidor a rodar na porta ${PORT}`);
    try {
        const [rows] = await db.query('SELECT 1');
        console.log('✅ Conexão à Base de Dados bem sucedida!');
    } catch (error) {
        console.error('❌ Erro ao conectar à Base de Dados:', error.message);
    }
});