const db = require("../../database.js");

function getProjects(user) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM projects WHERE username = ?";
    db.all(sql, [user], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function createProject(projectname, user, id) {
  const date = new Date();
  const dateaccessed = date.toISOString();
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO projects (username, projectname, project_id, dateaccessed) VALUES (?, ?, ?, ?)";
    db.run(sql, [user, projectname, id, dateaccessed], (err) => {
      if (err) {
        reject(err);
      }
      resolve("Project created");
    });
  });
}

function deleteProject(id) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM projects WHERE project_id = ?";
    db.run(sql, [id], (err) => {
      if (err) {
        reject(err);
      }
      resolve("Project deleted");
    });
  });
}

function updateProject(id, projectname) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE projects SET projectname = ? WHERE project_id = ?";
    db.run(sql, [projectname, id], (err) => {
      if (err) {
        reject(err);
      }
      resolve("Project updated");
    });
  });
}

const getLists = (projectid) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM lists WHERE project_id = ?";
    db.all(sql, [projectid], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};

module.exports = {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
  getLists,
};
