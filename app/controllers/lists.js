const services = require("../services/lists");

async function createList(req, res) {
  try {
    const data = {
      projectid: req.body.project_id,
      listname: req.body.listname,
      username: req.body.username,
      listid: req.body.list_id,
    };
    const result = await services.createList(
      data.projectid,
      data.listname,
      data.username,
      data.listid
    );
    console.log("list created:", result);
    res.status(200).json({
      message: result,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function updateList(req, res) {
  try {
    const data = {
      listid: req.params.listid,
      listname: req.body.listname,
    };
    console.log("listname updated:", data.listname);
    const result = await services.updateList(data.listid, data.listname);
    res.status(200).json({
      message: result,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function deleteList(req, res) {
  try {
    const listid = req.params.listid;
    const result = await services.deleteList(listid);
    console.log("list deleted:", listid);
    res.status(200).json({
      message: result,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function getTasks(req, res) {
  try {
    const listid = req.params.listid;
    const result = await services.getTasks(listid);
    console.log("tasks retrieved:", listid);
    if (result.length === 0) {
      res.status(200);
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function getCompleteTasks(req, res) {
  try {
    const listid = req.params.listid;
    const result = await services.getCompleteTasks(listid);
    console.log("completed:", listid);
    if (result.length === 0) {
      res.status(200);
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

module.exports = {
  createList,
  updateList,
  deleteList,
  getTasks,
  getCompleteTasks,
};
