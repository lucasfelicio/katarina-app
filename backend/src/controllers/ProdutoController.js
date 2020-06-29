const connection = require('../database/connection');
module.exports = {
    async read(request, response) {
        const { id_categoria, id_empresa } = request.query;
        try {
            const produtos = await connection('materiais')
                .where({
                    'emp_001': id_empresa, 'sit_001': 4,
                    'mat_visivel': true,
                    'cat_001': id_categoria
                })
                .select('mat_001', 'mat_003', 'mat_008', 'mat_021')
                .orderBy('mat_003', 'asc')
            if (!produtos) {
                response.status(404)
                    .json({ error: 'Nenhum produto encontrado.' })
            } else {
                return response.status(200).json(produtos);
            }
        } catch (error) {
            return response.status(500)
                .json({ descricao: 'Erro no servidor: ' + error })
        }
    },
};







