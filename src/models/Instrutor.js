import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Instrutor extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        cpf: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // Campo que não existe na base de dados
        password_hash: Sequelize.STRING,
        data_carteira: Sequelize.DATE,
        data_curso: Sequelize.DATE,
        veiculo_id: Sequelize.INTEGER,
      },
      { sequelize, tableName: 'instrutores' }
    );
    // Gerando o password Hash
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  // Associações
  static associate(models) {
    this.belongsTo(models.Veiculo, { foreignKey: 'veiculo_id', as: 'veiculo' });
    this.hasMany(models.Aluno, { foreignKey: 'instrutor_id', as: 'instrutor' });
  }
}

export default Instrutor;
