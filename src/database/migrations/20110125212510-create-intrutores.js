module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('instrutores', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_carteira: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      data_curso: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      veiculo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        references: { model: 'veiculos', key: 'id' },
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
    return queryInterface.dropTable('instrutores');
  },
};
