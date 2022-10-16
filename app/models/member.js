"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model, Op } = require("sequelize");
const {
  MEMBER_HAS_MANY_MEMBER_BOOK,
  MEMBER_MODEL_NAME,
  MEMBER_TABLE_NAME,
} = require("../fixtures/tb_member.fixture");

module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.MemberBook, MEMBER_HAS_MANY_MEMBER_BOOK);
    }
  }
  Member.init(
    {
      id: { allowNull: true, primaryKey: true, type: DataTypes.UUID },
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      status: DataTypes.STRING,
      borrow_count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: MEMBER_MODEL_NAME,
      tableName: MEMBER_TABLE_NAME,
    }
  );

  Member.beforeCreate((model, options) => {
    return (model.id = uuidv4());
  });

  return Member;
};
