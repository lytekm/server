const db = require("../../database.js");

const getPlannerItem = (username) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM dayplanner WHERE username = ?";
    db.all(sql, [username], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};

const addPlannerItem = (username, taskname, starttime, endtime, notes, id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO dayplanner (username, taskname, starttime, endtime, notes, dayplanner_id) VALUES (?, ?, ?, ?, ?, ?)";
    db.run(sql, [username, taskname, starttime, endtime, notes, id], (err) => {
      if (err) {
        reject(err);
      }
      resolve("A new planner item has been added");
    });
  });
};

const deletePlannerItem = (username, id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "DELETE FROM dayplanner WHERE username = ? AND dayplanner_id = ?";
    db.run(sql, [username, id], (err) => {
      if (err) {
        reject(err);
      }
      resolve("Planner item has been deleted");
    });
  });
};

module.exports = {
  getPlannerItem,
  addPlannerItem,
  deletePlannerItem,
};
