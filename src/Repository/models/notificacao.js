/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notificacao', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    mensagem: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    tipo: {
      type: DataTypes.ENUM('mensal','localizacao'),
      allowNull: false
    },
    raio: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    data_ultimo_envio: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0001-01-01 00:00:00'
    },
    fk_usu_portal_id_cadastro: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    fk_usu_portal_id_atualizacao: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    fk_loja_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'loja',
        key: 'id'
      }
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
    tableName: 'notificacao'
  });
};
