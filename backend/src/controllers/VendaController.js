const connection = require('../database/connection');
const timestamp = require('time-stamp');
module.exports = {
    async read(request, response) {
        const { tipo, nro_com_mesa, id_empresa } = request.query;
        try {
            let select = connection
                .select('ven_001', 'ven_009', 'ven_026', 'ven_025')
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
                return response.status(401)
                    .json({ descricao: 'Erro ao consultar venda(s)!' })
            }
            else {
                return response.status(200).json(vendas);
            }
        } catch (error) {
            return response.status(500)
                .json({ descricao: 'Erro no servidor: ' + error })
        }
    },
    async create(request, response) {
        const id_usuario = request.headers.authorization;
        const { tipo, nro_comanda, nro_mesa, id_empresa } = request.body;
        try {
            const [id] = await connection('venda')
                .where('emp_001', id_empresa)
                .max('ven_001')
            id_venda = id['max'] + 1;
            const [caixa] = await connection('caixa')
                .select('id_caixa')
                .where({
                    'id_empresa': id_empresa, 'id_situacao': 4
                });
            id_caixa = caixa['id_caixa'];
            await connection('venda')
                .insert({
                    'ven_001': id_venda,
                    'ven_002': 0,
                    'emp_001': id_empresa,
                    'dat_001_1': timestamp('YYYY-MM-DD HH:mm:ss.ms'),
                    'ven_025': nro_mesa,
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
            if (!id_venda) {
                return response.status(400)
                    .json({ descricao: 'Erro ao inserir a venda' });
            }
            else {
                return response.status(200).json(id_venda);
            }
        } catch (error) {
            return response.status(500)
                .json({ descricao: 'Erro no servidor: ' + error })
        }
    },
    async createItem(request, response) {
        const id_usuario = request.headers.authorization;
        const { id_empresa, id_venda, id_produto, quantidade, valor_unit,
            valor_total, observacao, id_impressora } = request.body;

        console.log(id_empresa, id_venda, id_produto, quantidade, valor_unit,
            valor_total, observacao, id_impressora)

        try {
            const [item] = await connection('vendaitem').max('ite_001')
                .where({
                    "emp_001": id_empresa,
                    "ven_001": id_venda
                });
            nro_item = item['max'] + 1
            await connection('vendaitem')
                .insert({
                    'emp_001': id_empresa,
                    'ven_001': id_venda,
                    'mat_001': id_produto,
                    'sit_001': 4,
                    'ite_001': nro_item,
                    'ite_002': quantidade,
                    'ite_003': valor_unit,
                    'ite_005': valor_total,
                    'ite_006': observacao,
                    'ite_008': 'N',
                    'ite_011': 'S',
                    'ite_012': 'N',
                    'ite_013': id_impressora,
                    'gar_001': id_usuario,
                    'tamanho': 'M',
                    'b_venda_tamanho': false,
                    'quantidade_impressao': 1,
                });
            await connection.raw(`select fn_calcula_total_venda
                (${id_venda},${id_empresa})`)
            return response.status(200).send();
        } catch (error) {
            return response.status(500)
                .json({ descricao: 'Erro no servidor: ' + error })
        }
    },
};

