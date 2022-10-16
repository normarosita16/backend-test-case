module.exports.MEMBER_TABLE_NAME = "tb_members";
module.exports.MEMBER_MODEL_NAME = "Member";

module.exports.MEMBER_HAS_MANY_MEMBER_BOOK = {
  as: "memberbook",
  foreignKey: "member_id",
};
