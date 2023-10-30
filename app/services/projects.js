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

const updateDateAccessed = (projectid) => {
  const date = new Date();
  const dateaccessed = date.toISOString();
  return new Promise((resolve, reject) => {
    const sql = "UPDATE projects SET dateaccessed = ? WHERE project_id = ?";
    db.run(sql, [dateaccessed, projectid], (err) => {
      if (err) {
        reject(err);
      }
      resolve("Project updated");
    });
  });
};

const getRecentProjects = (user) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT projectname, MAX(datetime(dateaccessed)) AS last_accessed, project_id FROM projects WHERE username = ? GROUP BY projectname ORDER BY last_accessed DESC LIMIT 3;";
    db.all(sql, [user], (err, rows) => {
      if (err) {
        reject(err);
      }
      // return the 3 most recently accessed projects
      resolve(rows);
    });
  });
};

const getCompletedTasks = (projectid) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT taskname FROM tasks WHERE list_id IN (SELECT list_id FROM lists WHERE project_id = ?) AND completed = 1";
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
  getRecentProjects,
  updateDateAccessed,
  getCompletedTasks,
};
