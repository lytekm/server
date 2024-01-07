const services = require("../services/tasks");

async function createTask(req, res) {
  try {
    const data = {
      listid: req.body.listid,
      tasktext: req.body.tasktext,
      username: req.body.username,
      taskid: req.body.taskid,
    };
    const result = await services.createTask(
      data.listid,
      data.tasktext,
      data.username,
      data.taskid
    );
    console.log("task created:", result);
    res.status(200).json({
      message: result,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function deleteTask(req, res) {
  try {
    const taskid = req.params.taskid;
    const listid = req.body.listid;
    const result = await services.deleteTask(taskid, listid);
    console.log("task deleted:", data.taskid);
    res.status(200).json({
      message: result,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function completeTask(req, res) {
  try {
    const data = {
      taskid: req.params.taskid,
    };
    const date = new Date();
    const result = await services.completeTask(data.taskid, data.listid);
    setDate(data.taskid, date);
    console.log("task completed:", data.taskid);
    res.status(200).json({
      message: result,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function updateTask(req, res) {
  try {
    const data = {
      taskid: req.params.taskid,
      tasktext: req.body.tasktext,
    };
    const result = await services.updateTask(data.taskid, data.tasktext);
    console.log("task updated:", data.taskid, data.tasktext);
    res.status(200).json({
      message: result,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function getText(req, res) {
  try {
    const data = req.params.taskid;
    const result = await services.getText(data);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

module.exports = {
  createTask,
  deleteTask,
  completeTask,
  updateTask,
  getText,
};
