const service = require("../services/users");

async function register(req, res) {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const date = new Date();
    let created = date.toISOString();
    const users = await service.register(username, email, password, created);
    console.log("user created:", users);
    res.status(200).json({
      message: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
}

async function login(req, res) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const users = await service.login(username, password);
    console.log("user logged in:", users);
    if (users === "success") {
      res.status(200).json({
        message: users,
      });
    } else {
      res.status(500).json({
        message: "username or password incorrect",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
}

module.exports = {
  register: register,
  login: login,
};
