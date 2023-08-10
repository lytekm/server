const controllers = require("../controllers/projects");
const router = require("express").Router();

router.get("/:user", controllers.getProjects);
router.post("/", controllers.createProject);
router.delete("/:id", controllers.deleteProject);
router.put("/:id", controllers.updateProject);
router.get("/lists/:projectid", controllers.getLists);

module.exports = router;