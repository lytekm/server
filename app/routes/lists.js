const router = require("express").Router();
const controllers = require("../controllers/lists");

router.post("/", controllers.createList);
router.put("/:listid", controllers.updateList);
router.delete("/:listid", controllers.deleteList);
router.get("/tasks/:listid", controllers.getTasks);
router.get("/tasks/complete/:listid", controllers.getCompleteTasks);

module.exports = router;
