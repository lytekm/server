const services = require("../services/projects");

async function getProjects(req, res) {
  // get all projects
  try {
    const user = req.params.user;
    const projects = await services.getProjects(user);
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function createProject(req, res) {
  // create a new project
  try {
    const projectname = req.body.projectname;
    const username = req.body.username;
    const id = req.body.project_id;
    const result = await services.createProject(projectname, username, id);
    console.log("project created:", result);
    res.status(200).json({
      message: result,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function deleteProject(req, res) {
  // delete a project
  try {
    const id = req.params.id;
    const result = services.deleteProject(id);
    console.log("project deleted:", id);
    res.status(200).json({
      message: result,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function updateProject(req, res) {
  // update a project
  try {
    const id = req.params.id;
    const projectname = req.body.projectname;
    const result = services.updateProject(id, projectname);
    console.log("project updated:", id);
    res.status(200).json({
      message: result,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function getLists(req, res) {
  try {
    const projectid = req.params.projectid;
    const lists = await services.getLists(projectid);
    services.updateDateAccessed(projectid);
    console.log("lists retrieved:", projectid);
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function getRecentProjects(req, res) {
  try {
    const user = req.params.user;
    const projects = await services.getRecentProjects(user);
    console.log("recent projects retrieved:", user);
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

module.exports = {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
  getLists,
  getRecentProjects,
};
