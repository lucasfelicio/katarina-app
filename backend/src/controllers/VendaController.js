const connection = require('../database/connection');
const timestamp = require('time-stamp');
module.exports = {
    async create(request, response) {
        const id_usuario = request.headers.authorization;
        const { tipo, nro_comanda, nro_mesa, id_empresa } = request.query;
        console.log(tipo, nro_comanda, nro_mesa, id_empresa)
        try {
            const [id] = await connection('venda')
                .where('emp_001',id_empresa)
                .max('ven_001')
            id_venda = id['max'] + 1;

            const [caixa] = await connection('caixa')
                .select('id_caixa')
                .where({'id_empresa': id_empresa,'id_situacao':4
                });
            id_caixa = caixa['id_caixa'];

            await connection('venda')
                .insert({
                    'ven_001': id_venda,
                    'ven_002': 0,
                    'emp_001': id_empresa,
                    'dat_001_1': timestamp('YYYY-MM-DD HH:mm:ss.ms'),
                    'ven_025': nro_mesa,
                    'cli_001': 0,
                    'sit_001': 8,
                    'usu_001_1': id_usuario,
                    'ven_024': tipo,
                    'ven_029': id_venda,
                    'ven_004': timestamp('YYYY-MM-DD HH:mm:ss.ms'),
                    'ven_023': 'N',
                    'id_caixa_abertura': id_caixa,
                    'ven_026': nro_comanda,
                    'terminal_abertura': 'Aplicativo mobile'
                });
            if (!id_venda){
                return response.status(400).json({ descricao: 'Erro ao inserir a venda'});
            }
            else {
                return response.status(200).json(id_venda);
            }
        } catch (error) {
            return response.status(500).json({ descricao: 'Erro no servidor: ' + error })
        }
    },
    async read(request, response) {
        const { tipo, nro_com_mesa, id_empresa } = request.query;
        try {
            let select = connection
                .select('ven_001', 'ven_009','ven_026','ven_025')
                .from('venda')
                .orderBy('venda.ven_001', 'asc')
                .where({ 'emp_001': id_empresa, 'sit_001': 8, 'ven_024': tipo })

            if (nro_com_mesa != undefined && nro_com_mesa != 0) {
                select = select.andWhere(function () {
                    this.where('ven_025', nro_com_mesa)
                        .orWhere('ven_026', nro_com_mesa)
                })
            }
            const vendas = await select
            if (!vendas) {
                return response.status(401).json({ descricao: 'Erro ao consultar venda(s)!' })
            }
            else {
                return response.status(200).json(vendas);
            }
        } catch (error) {
            return response.status(500).json({ descricao: 'Erro no servidor: ' + error })
        }
    },
};

