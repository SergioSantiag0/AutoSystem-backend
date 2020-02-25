import Sequelize, { Model } from 'sequelize';

class Veiculo extends Model {
  static init(sequelize) {
    super.init(
      {
        placa: Sequelize.STRING,
        cor: Sequelize.STRING,
        modelo: Sequelize.STRING,
        ano: Sequelize.INTEGER,
      },
      { sequelize }
    );
  }

  // Associações
  static associate(models) {
    this.belongsTo(models.Instrutor, { foreignKey: 'id', as: 'instrutor' });
    this.hasMany(models.Aluno, { foreignKey: 'veiculo_id', as: 'veiculo' });
  }
}

export default Veiculo;
