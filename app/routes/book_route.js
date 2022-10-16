const dotEnv = require("dotenv");
const { Router } = require("express");

const bookController = require("../controllers/book_controller");

const router = Router();
dotEnv.config();

router.post("", bookController.create);
router.get("", bookController.list);
router.get("/:id", bookController.view);
router.put("/:id", bookController.update);
router.delete("/:id", bookController.delete);

module.exports = router;
