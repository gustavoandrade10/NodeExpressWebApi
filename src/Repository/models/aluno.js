/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('aluno', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    sexo: {
      type: DataTypes.ENUM('Masculino','Feminino'),
      allowNull: false
    },
    estado_civil: {
      type: DataTypes.ENUM('Amasiado','Casado(a)','Divorciado(a)','Separado','Solteiro(a)','União Estável(a)','Viúvo(a)'),
      allowNull: false
    },
    dependentes: {
      type: DataTypes.ENUM('Não Tem','1','2','3','4 ou Mais'),
      allowNull: false
    },
    rg: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    telefone: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    celular: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    telefone_recado: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    falar_com: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    possui_deficiencia: {
      type: DataTypes.ENUM('Não sou deficiente','Auditiva','Fala','Física','Intelectual/Mental','Visual'),
      allowNull: false
    },
    pode_viajar: {
      type: DataTypes.ENUM('Sim','Não'),
      allowNull: false
    },
    escolaridade: {
      type: DataTypes.ENUM('Ensino Fundamental - Incompleto','Ensino Fundamental - Cursando','Ensino Fundamental','Ensino Médio - Incompleto','Ensino Médio - Cursando','Ensino Médio - Completo','Ensino Superior - Incompleto','Ensino Superior - Cursando','Ensino Superior - Completo','Pós Graduação - Incompleto','Pós Graduação - Cursando','Pós Graduação - Completo','Mestrado - Incompleto','Mestrado - Cursando','Mestrado - Completo','Doutorado - Incompleto','Doutorado - Cursando','Doutorado - Completo'),
      allowNull: false
    },
    ultima_remuneracao: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    pretensao_salarial: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    profissao: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    disponibilidade_horario: {
      type: DataTypes.ENUM('Indiferente','Integral','Madrugada','Manhã','Manhã e Noite','Noite','Tarde','Turno'),
      allowNull: false
    },
    disponibilidade: {
      type: DataTypes.ENUM('Domingo a Domingo','Segunda a Sábado','Segunda a Sexta'),
      allowNull: false
    },
    possui_cnh: {
      type: DataTypes.ENUM('Não Possui','Tipo A (Moto)','Tipo A-B (Moto e Carro)','Tipo B (Carro)','Tipo C (Utilitários)','Tipo D (Ônibus)','Tipo E (Carretas)'),
      allowNull: false
    },
    trabalha_atualmente: {
      type: DataTypes.ENUM('Sim','Não'),
      allowNull: false
    },
    curso: {
      type: DataTypes.ENUM('Técnico em Administração e RH','Técnico em Segurança do Trabalho e Meio Ambiente','Técnico em Logística e Qualidade','Técnico em Fabricação Mecânica e Qualidade','Curso de Capacitação'),
      allowNull: false
    },
    situacao_curso: {
      type: DataTypes.ENUM('Concluído','Em andamento','Trancado'),
      allowNull: false
    },
    data_curso: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    skype: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    facebook: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    twitter: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    linkedin: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    fk_endereco_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'endereco',
        key: 'id'
      }
    },
    cadastrado_em: {
      type: DataTypes.DATE,
      allowNull: false
    },
    atualizado_em: {
      type: DataTypes.DATE,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    dados_complementares: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    tableName: 'aluno'
  });
};
