const services = require("../services/dailytasks");

async function getDailyTasks(req, res) {
  // get all dailytasks
  try {
    const user = req.params.user;
    const tasks = await services.getDailyTasks(user);
    if (tasks.length === 0) {
      res.status(200);
    }
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function createDailyTask(req, res) {
  // create a new dailytask
  try {
    const tasktext = req.body.tasktext;
    const username = req.body.user;
    const id = req.body.dailytask_id;
    const result = await services.createDailyTask(tasktext, username, id);
    res.status(200).json({
      message: result,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function deleteDailyTask(req, res) {
  // delete a dailytask
  try {
    const id = req.params.id;
    const result = await services.deleteDailyTask(id);
    res.status(200).json({
      message: result,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

module.exports = {
  getDailyTasks,
  createDailyTask,
  deleteDailyTask,
};
