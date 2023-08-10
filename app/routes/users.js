const controllers = require("../controllers/users");
const router = require("express").Router();

router.post("/register", controllers.register);
router.post("/login", controllers.login);

module.exports = router;
