module.exports.BOOK_TABLE_NAME = "tb_books";
module.exports.BOOK_MODEL_NAME = "Book";

module.exports.BOOK_HAS_MANY_MEMBER_BOOK = {
  as: "memberbook",
  foreignKey: "book_id",
};
