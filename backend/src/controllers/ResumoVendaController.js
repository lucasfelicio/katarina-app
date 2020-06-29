const connection = require('../database/connection');
module.exports = {
  async read(request, response) {
    const { id_venda, id_empresa } = request.query;
    try {
      const venda = await connection('venda')
        .select('ven_001', 'ven_009', 'ven_026', 'ven_025')
        .orderBy('venda.ven_001', 'asc')
        .where({ 'emp_001': id_empresa, 'ven_001': id_venda, 'sit_001': 8 });
      const vendaitens = await connection('vendaitem')
        .where({
          'vendaitem.emp_001': id_empresa,
          'vendaitem.sit_001': 4,
          'vendaitem.ven_001': id_venda
        })
        .select('vendaitem.ite_001', 'materiais.mat_003', 'vendaitem.ite_003',
          'vendaitem.ite_002',
          'vendaitem.ite_005',
          'vendaitem.ite_006',
        )
        .join('materiais', 'materiais.mat_001', '=', 'vendaitem.mat_001')
        .orderBy('vendaitem.ite_001', 'asc')
      return response.status(200).json(venda.concat({ vendaitens }));
    } catch (error) {
      return response.status(500)
        .json({ descricao: 'Erro no servidor: ' + error.message })
    }
  }
};


