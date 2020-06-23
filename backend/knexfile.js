module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'nortesystem',// nome do banco de dados
      user:     'nortesystem',//usuário do banco de dados
      password: '101485', //senha do usuário do banco de dados
      port: 5432,//porta do serviço do banco de dados
      host: 'localhost' //endereço do servidor do banco de dados
    },
    pool: {
      min: 0,
      max: 50
    },
    useNullAsDefault: true,
  },
  test: {
    client: 'postgresql',
    connection: {
      database: 'nortesystem',// nome do banco de dados
      user:     'nortesystem',//usuário do banco de dados
      password: '101485', //senha do usuário do banco de dados
      port: 5432,//porta do serviço do banco de dados
      host: 'localhost' //endereço do servidor do banco de dados
    },
    pool: {
      min: 0,
      max: 50
    },
    useNullAsDefault: true,
  },
  staging: {
    client: 'postgresql',
    connection: {
      database: 'nortesystem',// nome do banco de dados
      user:     'nortesystem',//usuário do banco de dados
      password: '101485', //senha do usuário do banco de dados
      port: 5432,//porta do serviço do banco de dados
      host: 'localhost' //endereço do servidor do banco de dados
    },
    pool: {
      min: 0,
      max: 50
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'nortesystem',// nome do banco de dados
      user:     'nortesystem',//usuário do banco de dados
      password: '101485', //senha do usuário do banco de dados
      port: 5432,//porta do serviço do banco de dados
      host: 'localhost' //endereço do servidor do banco de dados
    },
    pool: {
      min: 0,
      max: 50
    },
    useNullAsDefault: true,
  }
};
