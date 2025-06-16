const Referencia = require('./Referencia');
const Anotacao = require('./Anotacao');
const Usuario = require('./Usuario');
const Trilha = require('./Trilha');

// Defina as associações aqui, depois de importar todos os models
Referencia.hasMany(Anotacao, { foreignKey: 'referencia_id' });

// Relacionamento
Anotacao.belongsTo(Referencia, {foreignKey: 'referencia_id',as: 'referencia'});

// Relacionamento com Usuario
Anotacao.belongsTo(Usuario, {foreignKey: 'usuario_id',as: 'usuario'});

// Relacionamento com Trilha
Anotacao.belongsTo(Trilha, {foreignKey: 'trilha_id',as: 'trilha'});

// Exporte os models para uso externo
module.exports = {
  Referencia,
  Anotacao,
  Usuario,
  Trilha,
};
