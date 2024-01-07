const services = require("../services/dayplanner");

async function getPlannerItems(req, res) {
  // get all dailytasks
  try {
    const user = req.params.user;
    const tasks = await services.getPlannerItem(user);
    if (tasks.length === 0) {
      res.status(200);
    }
    res.status(200).json(tasks);
    console.log("dailytasks retrieved");
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    console.log(err);
  }
}

async function createPLannerItem(req, res) {
  // create a new dailytask
  try {
    const taskname = req.body.taskname;
    const username = req.body.user;
    const id = req.body.dayplanner_id;
    const notes = req.body.notes;
    const starttime = req.body.starttime;
    const endtime = req.body.endtime;
    const result = await services.addPlannerItem(
      username,
      taskname,
      starttime,
      endtime,
      notes,
      id
    );
    res.status(200).json({
      message: result,
    });
    console.log("dailytask created");
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    console.log(err);
  }
}

async function deletePlannerItem(req, res) {
  // delete a dailytask
  try {
    const id = req.params.id;
    const result = await services.deletePlannerItem(id);
    res.status(200).json({
      message: result,
    });
    console.log("dailytask deleted");
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    console.log(err);
  }
}

module.exports = {
  getPlannerItems,
  createPLannerItem,
  deletePlannerItem,
};
