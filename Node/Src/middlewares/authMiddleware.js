const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// <---------------- Alterado por gemini: Função que valida o Token
const verifyToken = (req, res, next) => {
    // 1. Procurar o token no cabeçalho do pedido (Header)
    const authHeader = req.headers['authorization'];
    
    // Se não tiver cabeçalho, expulsa logo
    if (!authHeader) {
        return res.status(403).json({ message: 'Acesso negado! Token em falta.' });
    }

    // O formato padrão é "Bearer <TOKEN>". Queremos separar a palavra 'Bearer' do código.
    const token = authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ message: 'Token mal formatado.' });
    }

    try {
        // 2. Verificar se a assinatura é válida usando o nosso segredo do .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Se passou, guardamos a info do utilizador no pedido (req)
        req.user = decoded;
        
        // 3. Sinal verde! Passa para o próximo passo (o Controller)
        next(); 
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado!' });
    }
};

module.exports = verifyToken;