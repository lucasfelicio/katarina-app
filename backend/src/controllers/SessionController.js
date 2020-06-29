const connection = require('../database/connection');
module.exports = {
    async read(request, response) {
        const { login, senha } = request.query;
        const user = await connection('usuarios')
            .where({ 'usu_003': login, 'usu_004': senha })
            .select('usu_001 as id', 'usu_002 as user_name')
            .first();
        if (!user) {
            return response.status(400)
                .json({
                    descricao: 'Usuário inexistente ou login/senha inválidos'
                });
        }
        return response.status(200).json(user);
    }
}

