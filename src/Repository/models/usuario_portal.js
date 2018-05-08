/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario_portal', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING(18),
      allowNull: true
    },
    login: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    tipo: {
      type: DataTypes.ENUM('cliente','administrador-cliente'),
      allowNull: false
    },
    data_cadastro: {
      type: DataTypes.DATE,
      allowNull: false
    },
    data_atualizacao: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'usuario_portal'
  });
};
