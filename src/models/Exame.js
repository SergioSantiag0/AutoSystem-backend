import Sequelize, { Model } from 'sequelize';

class Exame extends Model {
  static init(sequelize) {
    super.init(
      {
        aluno_id: Sequelize.INTEGER,
        instrutor_id: Sequelize.INTEGER,
        categoria: Sequelize.STRING,
        date: Sequelize.DATE,
        resultado: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'exames',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id', as: 'aluno' });
    this.belongsTo(models.Instrutor, {
      foreignKey: 'instrutor_id',
      as: 'instrutor',
    });
  }
}

export default Exame;
