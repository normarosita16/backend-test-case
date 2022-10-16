const dotEnv = require("dotenv");
const { Router } = require("express");

const memberController = require("../controllers/member_controller");

const router = Router();
dotEnv.config();

router.post("", memberController.create);
router.get("", memberController.list);
router.get("/:id", memberController.view);
router.put("/:id", memberController.update);
router.delete("/:id", memberController.delete);

module.exports = router;
