const db = require("../../database.js");

function register(username, email, password, created) {
  // user registration
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO user (username, email, password, created) VALUES (?, ?, ?, ?)";
    db.run(sql, [username, email, password, created], (err) => {
      if (err) {
        reject(err);
      }
      resolve("User created");
    });
  });
}

function login(username, password) {
  // user login
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM user WHERE username = ? AND password = ?";
    db.all(sql, [username, password], (err, rows) => {
      if (err) {
        reject(err);
        console.log(err);
      }
      resolve("success");
    });
  });
}

module.exports = {
  register: register,
  login: login,
};
