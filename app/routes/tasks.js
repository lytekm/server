const controllers = require("../controllers/tasks");
const router = require("express").Router();

router.get("/:taskid", controllers.getText);
router.post("/", controllers.createTask);
router.put("/:taskid", controllers.updateTask);
router.delete("/:taskid/:listid", controllers.deleteTask);
router.put("/complete/:taskid", controllers.completeTask);
router.get("/count/:listid", controllers.getCompletion);

module.exports = router;
