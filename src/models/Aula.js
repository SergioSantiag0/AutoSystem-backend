import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Aula extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
        cancelavel: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.date, 2));
          },
        },
      },
      { sequelize, tableName: 'aulas' }
    );
  }

  // Associações
  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id', as: 'aluno' });
    this.belongsTo(models.Instrutor, {
      foreignKey: 'instrutor_id',
      as: 'instrutor',
    });
  }
}

export default Aula;
