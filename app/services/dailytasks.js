const db = require("../../database.js");

function getDailyTasks(user) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM dailytask WHERE username = ?";
    db.all(sql, [user], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
      console.log(rows);
    });
  });
}

function createDailyTask(tasktext, username, id) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO dailytask (tasktext, username, dailytask_id) VALUES (?,?,?)";
    db.run(sql, [tasktext, username, id], (err) => {
      if (err) {
        reject(err);
      }
      resolve("dailytask created");
    });
  });
}

function deleteDailyTask(id) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM dailytask WHERE dailytask_id = ?";
    db.run(sql, [id], (err) => {
      if (err) {
        reject(err);
      }
      resolve("dailytask deleted");
    });
  });
}

module.exports = {
  getDailyTasks,
  createDailyTask,
  deleteDailyTask,
};
