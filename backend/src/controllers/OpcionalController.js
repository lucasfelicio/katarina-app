const connection = require('../database/connection');
module.exports = {
    async read(request, response) {
        const { id_produto, id_empresa } = request.query;
        try {
            const opcionais = await connection('produtos_opcionais')
                .where({'id_empresa': id_empresa,'id_produto': id_produto})
                .select('id_opcional', 'descricao', 'valor')
                .orderBy('descricao', 'asc')

            if (!opcionais) {
                return response.status(404)
                    .json({ error: 'Não existe opcionais cadastrados para o produto informado' })
            } else {
                return response.status(200).json(opcionais);
            }
        } catch (error) {
            return response.status(500).json({ descricao: 'Erro no servidor: ' + error })
        }
    },
};

