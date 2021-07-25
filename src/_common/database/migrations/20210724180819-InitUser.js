'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: true,
          defaultValue: null,
        },
        login: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: true,
          defaultValue: null,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        surname: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        birthdate: {
          type: Sequelize.DATEONLY,
          allowNull: true,
          defaultValue: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        },
      },
      {
        charset: 'utf8',
      },
    );
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('Users');
  },
};
