import Sequelize, { Model } from 'sequelize';

class Instrutor extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        data_carteira: Sequelize.DATE,
        data_curso: Sequelize.DATE,
        veiculo_id: Sequelize.INTEGER,
      },
      { sequelize, tableName: 'instrutores' }
    );
  }

  // Associações
  static associate(models) {
    this.belongsTo(models.Veiculo, { foreignKey: 'veiculo_id', as: 'veiculo' });
    this.hasMany(models.Aluno, { foreignKey: 'instrutor_id', as: 'instrutor' });
  }
}

export default Instrutor;
