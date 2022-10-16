"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model, Op } = require("sequelize");
const {
  BOOK_MODEL_NAME,
  BOOK_TABLE_NAME,
  BOOK_HAS_MANY_MEMBER_BOOK,
} = require("../fixtures/tb_book.fixture");

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.MemberBook, BOOK_HAS_MANY_MEMBER_BOOK);
    }
  }
  Book.init(
    {
      id: { allowNull: true, primaryKey: true, type: DataTypes.UUID },
      code: DataTypes.STRING,
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: BOOK_MODEL_NAME,
      tableName: BOOK_TABLE_NAME,
    }
  );

  Book.beforeCreate((model, options) => {
    return (model.id = uuidv4());
  });

  return Book;
};
