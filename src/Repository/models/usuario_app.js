/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario_app', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(60),
      allowNull: false,
      primaryKey: true
    },
    telefone: {
      type: DataTypes.STRING(18),
      allowNull: true
    },
    fcm_token: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tipo_dispositivo: {
      type: DataTypes.ENUM('android','ios'),
      allowNull: false,
      defaultValue: 'android'
    },
    codigo: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    login: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    senha: {
      type: DataTypes.STRING(128),
      allowNull: false,
      primaryKey: true
    },
    data_cadastro: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    },
    data_atualizacao: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'usuario_app'
  });
};
