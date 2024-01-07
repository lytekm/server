const app = require("./app");

const PORT = process.env.PORT || 5000;

app.use("/users", require("./app/routes/users"));
app.use("/dailytasks", require("./app/routes/dailytasks"));
app.use("/projects", require("./app/routes/projects"));
app.use("/lists", require("./app/routes/lists"));
app.use("/tasks", require("./app/routes/tasks"));
app.use("/dayplanner", require("./app/routes/dayplanner"));

app.listen(PORT, () => {
  console.log("listenting on port:", PORT);
});
