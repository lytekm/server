const controllers = require("../controllers/dayplanner");
const router = require("express").Router();

router.get("/:user", controllers.getPlannerItems);
router.post("/", controllers.createPLannerItem);
router.delete("/:id", controllers.deletePlannerItem);

module.exports = router;
