module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('exames', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      aluno_id: {
        type: Sequelize.INTEGER,
        references: { model: 'alunos', key: 'id' },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      instrutor_id: {
        type: Sequelize.INTEGER,
        references: { model: 'instrutores', key: 'id' },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      categoria: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      resultado: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('exames');
  },
};
