const {
  MEMBER_BOOK_TABLE_NAME,
} = require("../fixtures/tb_member_book.fixture");
const { BOOK_TABLE_NAME } = require("../fixtures/tb_book.fixture");
const { MEMBER_TABLE_NAME } = require("../fixtures/tb_member.fixture");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(MEMBER_BOOK_TABLE_NAME, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      member_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: MEMBER_TABLE_NAME,
          },
          key: "id",
        },
      },
      book_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: BOOK_TABLE_NAME,
          },
          key: "id",
        },
      },
      borrow_date: {
        type: Sequelize.DATE,
      },
      return_date: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,
      },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
      deletedAt: { type: Sequelize.DATE },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(MEMBER_BOOK_TABLE_NAME);
  },
};
