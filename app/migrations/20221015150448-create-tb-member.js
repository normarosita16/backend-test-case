const { MEMBER_TABLE_NAME } = require("../fixtures/tb_member.fixture");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(MEMBER_TABLE_NAME, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      code: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      borrow_count: {
        type: Sequelize.INTEGER,
      },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
      deletedAt: { type: Sequelize.DATE },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(MEMBER_TABLE_NAME);
  },
};
