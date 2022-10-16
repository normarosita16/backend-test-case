const { BOOK_TABLE_NAME } = require("../fixtures/tb_book.fixture");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(BOOK_TABLE_NAME, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      code: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
      },
      stock: {
        type: Sequelize.INTEGER,
      },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
      deletedAt: { type: Sequelize.DATE },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(BOOK_TABLE_NAME);
  },
};
