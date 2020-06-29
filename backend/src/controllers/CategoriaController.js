const connection = require('../database/connection');
module.exports = {
    async read(request, response) {
        const { id_empresa } = request.query;
        try {
            const categorias = await connection('categoria')
                .where({
                    'emp_001': id_empresa, 'sit_001': 4, 'cat_visivel': true
                })
                .select('cat_001', 'cat_002')
                .orderBy('cat_ordem', 'asc')
            if (!categorias) {
                return response.status(404)
                    .json({ descricao: 'Nenhuma categoria encontrada' })
            } else {
                return response.status(200).json(categorias);
            }
        } catch (error) {
            return response.status(500)
                .json({ descricao: 'Erro no servidor: ' + error })
        }
    },
};


