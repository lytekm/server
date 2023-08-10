const db = require("../../database.js");

const createList = (projectid, listname, username, listid) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO lists (project_id, listname, username, list_id) VALUES (?,?,?,?)";
    db.run(sql, [projectid, listname, username, listid], (err) => {
      if (err) {
        reject(err);
      }
      resolve("list created");
    });
  });
};

const updateList = (listid, listname) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE lists SET listname = ? WHERE list_id = ?";
    db.run(sql, [listname, listid], (err) => {
      if (err) {
        reject(err);
      }
      resolve("list updated");
    });
  });
};

const deleteList = (listid) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM lists WHERE list_id = ?";
    db.run(sql, [listid], (err) => {
      if (err) {
        reject(err);
      }
      resolve("list deleted");
    });
  });
};

const getTasks = (listid) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tasks WHERE list_id = ?";
    db.all(sql, [listid], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};

module.exports = {
  createList,
  updateList,
  deleteList,
  getTasks,
};
