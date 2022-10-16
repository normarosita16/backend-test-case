module.exports.MEMBER_BOOK_TABLE_NAME = "tb_member_books";
module.exports.MEMBER_BOOK_MODEL_NAME = "MemberBook";

module.exports.MEMBER_BOOK_BELONGS_TO_BOOK = {
  as: "book",
  foreignKey: "book_id",
};
module.exports.MEMBER_BOOK_BELONGS_TO_MEMBER = {
  as: "member",
  foreignKey: "member_id",
};
