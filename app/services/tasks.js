const database = require("../../database.js");

const createTask = (listid, taskname, username, taskid) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO tasks (list_id, taskname, task_id, username) VALUES (?, ?, ?, ?)";
    const params = [listid, taskname, taskid, username];
    database.run(sql, params, function (err) {
      if (err) {
        reject(err.message);
      } else {
        resolve("row added");
      }
    });
  });
};

const deleteTask = (taskid) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM tasks WHERE task_id = ?";
    const params = [taskid];
    database.run(sql, params, function (err) {
      if (err) {
        console.log(err);
        reject(err.message);
      } else {
        resolve("row deleted");
      }
    });
  });
};

const completeTask = (taskid) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE tasks SET completed = 1 WHERE task_id = ?";
    const params = [taskid];
    database.run(sql, params, function (err) {
      if (err) {
        console.log(err);
        reject(err.message);
      } else {
        resolve("row updated");
      }
    });
  });
};

const setCompletionDate = (taskid, date) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE tasks SET datecompleted = ? WHERE task_id = ?";
    const params = [date, taskid];
    database.run(sql, params, function (err) {
      if (err) {
        console.log(err);
        reject(err.message);
      } else {
        resolve("row updated");
      }
    });
  });
};

const updateTask = (taskid, tasktext) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE tasks SET taskname = ? WHERE task_id = ?";
    const params = [tasktext, taskid];
    database.run(sql, params, function (err) {
      if (err) {
        reject(err.message);
      } else {
        resolve("row updated");
      }
    });
  });
};

const getText = (taskid) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tasks WHERE task_id = ?";
    const params = [taskid];
    database.all(sql, params, (err, rows) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = {
  createTask,
  deleteTask,
  completeTask,
  updateTask,
  getText,
  setCompletionDate,
};
