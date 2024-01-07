const controllers = require("../controllers/projects");
const router = require("express").Router();

router.get("/:user", controllers.getProjects);
//router.get("/project/:id", controllers.getProject);
router.post("/", controllers.createProject);
router.delete("/:id", controllers.deleteProject);
router.put("/:id", controllers.updateProject);
router.get("/lists/:projectid", controllers.getLists);
router.get("/recent/:user", controllers.getRecentProjects);
router.get("/complete/:projectid", controllers.getCompletedTasks);
router.get("/completion/:projectid", controllers.getCompletion);

module.exports = router;
