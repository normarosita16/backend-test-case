const dotEnv = require("dotenv");
const { Router } = require("express");

const memberbookController = require("../controllers/memberbook_controller");

const router = Router();
dotEnv.config();

router.post("", memberbookController.create);
router.get("", memberbookController.list);
router.get("/:id", memberbookController.view);
router.put("/:member_id", memberbookController.updateReturn);
router.delete("/:id", memberbookController.delete);

module.exports = router;
