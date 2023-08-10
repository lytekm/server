const controllers = require("../controllers/dailytasks");
const router = require("express").Router();

router.get("/:user", controllers.getDailyTasks);
router.post("/", controllers.createDailyTask);
router.delete("/:id", controllers.deleteDailyTask);

module.exports = router;
