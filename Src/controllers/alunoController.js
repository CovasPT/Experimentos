const AlunoModel = require('../models/alunoModel');

const alunoController = {

    // <---------------- Alterado por gemini: Listar (READ)
    listarAlunos: async (req, res) => {
        try {
            const alunos = await AlunoModel.getAll();
            return res.status(200).json(alunos);
        } catch (error) {
            console.error(error); // Boa prática: logar o erro no servidor
            return res.status(500).json({ message: 'Erro ao buscar alunos.' });
        }
    },

    // <---------------- Alterado por gemini: Criar (CREATE)
    criarAluno: async (req, res) => {
        try {
            console.log('Body recebido:', req.body); // Debug: Verifica no terminal o que está a chegar
            const novoAluno = req.body || {};

            // Validação básica (Boa prática: nunca confiar nos dados do utilizador)
            if (!novoAluno.nome || !novoAluno.email) {
                return res.status(400).json({ message: 'Nome e Email são obrigatórios!' });
            }

            const alunoCriado = await AlunoModel.create(novoAluno);
            return res.status(201).json({ message: 'Aluno criado com sucesso!', aluno: alunoCriado });
        } catch (error) {
            // Se o erro for de duplicidade (ex: email já existe)
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: 'Este email já está registado!' });
            }
            return res.status(500).json({ message: 'Erro ao criar aluno.', error: error.message });
        }
    },

    // <---------------- Alterado por gemini: Atualizar (UPDATE)
    atualizarAluno: async (req, res) => {
        try {
            const { id } = req.params;
            const dadosAtualizados = req.body || {}; // Proteção contra undefined
            
            const alterou = await AlunoModel.update(id, dadosAtualizados);

            if (!alterou) {
                return res.status(404).json({ message: 'Aluno não encontrado.' });
            }
            
            return res.json({ message: 'Aluno atualizado com sucesso!' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao atualizar aluno.' });
        }
    },

    // <---------------- Alterado por gemini: Apagar (DELETE)
    apagarAluno: async (req, res) => {
        try {
            const { id } = req.params;
            const apagou = await AlunoModel.delete(id);

            if (!apagou) {
                return res.status(404).json({ message: 'Aluno não encontrado.' });
            }

            return res.json({ message: 'Aluno removido com sucesso!' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao apagar aluno.' });
        }
    }
};

module.exports = alunoController;