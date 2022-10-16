"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");
const {
  MEMBER_BOOK_BELONGS_TO_BOOK,
  MEMBER_BOOK_BELONGS_TO_MEMBER,
  MEMBER_BOOK_MODEL_NAME,
  MEMBER_BOOK_TABLE_NAME,
} = require("../fixtures/tb_member_book.fixture");

module.exports = (sequelize, DataTypes) => {
  class MemberBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Book, MEMBER_BOOK_BELONGS_TO_BOOK);
      this.belongsTo(models.Member, MEMBER_BOOK_BELONGS_TO_MEMBER);
    }
  }
  MemberBook.init(
    {
      id: { allowNull: true, primaryKey: true, type: DataTypes.UUID },
      book_id: DataTypes.UUID,
      member_id: DataTypes.UUID,
      borrow_date: DataTypes.DATE,
      return_date: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: MEMBER_BOOK_MODEL_NAME,
      tableName: MEMBER_BOOK_TABLE_NAME,
    }
  );

  MemberBook.beforeCreate((model, options) => {
    return (model.id = uuidv4());
  });

  return MemberBook;
};
