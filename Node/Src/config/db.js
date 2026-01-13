const mysql = require('mysql2');
const dotenv = require('dotenv');

// <---------------- Alterado por gemini: Carrega as variáveis do ficheiro .env para a memória
dotenv.config();

// <---------------- Alterado por gemini: Criamos uma 'Pool' (piscina) de conexões.
// Em vez de abrir e fechar uma conexão a cada pedido (lento), mantemos várias abertas prontas a usar.
// É uma boa prática essencial para APIs.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// <---------------- Alterado por gemini: Exportamos a versão com 'promise()'.
// Isto permite usar 'await pool.query(...)' no futuro, evitando o "Callback Hell" típico do JS antigo.
module.exports = pool.promise();