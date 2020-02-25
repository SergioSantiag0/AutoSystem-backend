import Sequelize, { Model } from 'sequelize';

class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
        cpf: Sequelize.STRING,
        rg: Sequelize.STRING,
        nome: Sequelize.STRING,
        telefone: Sequelize.STRING,
        email: Sequelize.STRING,
        data_nasc: Sequelize.DATE,
        sexo: Sequelize.STRING,
        nome_pai: Sequelize.STRING,
        nome_mae: Sequelize.STRING,
        endereco: Sequelize.STRING,
        bairro: Sequelize.STRING,
        cidade: Sequelize.STRING,
        uf: Sequelize.STRING,
        categoria: Sequelize.STRING,
        veiculo_id: Sequelize.INTEGER,
        instrutor_id: Sequelize.INTEGER,
        data_matric: Sequelize.DATE,
        profissao: Sequelize.STRING,
        local_trab: Sequelize.STRING,
        ativo: Sequelize.BOOLEAN,
      },
      { sequelize }
    );
  }

  // Associações
  static associate(models) {
    this.belongsTo(models.Instrutor, {
      foreignKey: 'instrutor_id',
      as: 'instrutor',
    });
    this.belongsTo(models.Veiculo, {
      foreignKey: 'veiculo_id',
      as: 'veiculo',
    });
  }
}

export default Aluno;
