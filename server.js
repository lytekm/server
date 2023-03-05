const express = require("express");
const cors = require("cors");
const fs = require("fs");

//funtions

//check if file is empty
function isFileEmpty(fileName, ignoreWhitespace = true) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(
        (!ignoreWhitespace && data.length == 0) ||
          (ignoreWhitespace && !!String(data).match(/^\s*$/))
      );
    });
  });
}

//write data to file
const writeData = (data, fileName) => {
  fs.writeFile(fileName, JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("data saved");
    }
  });
};

//append data to database
const appendDataToUsers = (data, fileName) => {
  isFileEmpty(fileName).then((isEmpty) => {
    if (isEmpty) {
      writeData(data, fileName);
    } else {
      fs.readFile(fileName, (err, fileData) => {
        if (err) {
          console.log(err);
        } else {
          const prev = JSON.parse(fileData);
          Object.assign(prev, data);
          writeData(prev, fileName);
        }
      });
    }
  });
};

// append data to the projects database
const appendDataToProjects = (data, projectsFile, userFile) => {
  //update projects database
  const project = {};
  project[data.projectID] = data;
  project[data.projectID].list = {};
  isFileEmpty(projectsFile).then((isEmpty) => {
    if (isEmpty) {
      writeData(project, projectsFile);
    } else {
      fs.readFile(projectsFile, (err, fileData) => {
        if (err) {
          console.log(err);
        } else {
          const prev = JSON.parse(fileData);
          Object.assign(prev, project);
          writeData(prev, projectsFile);
        }
      });
    }
  });

  //update user database
  fs.readFile(userFile, (err, fileData) => {
    if (err) {
      console.log(err);
    } else {
      const users = JSON.parse(fileData);
      users[data.user].projects.push(data.projectID);
      writeData(users, userFile);
    }
  });
};

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

// signup new user
app.post("/api/newlogin", (req, res) => {
  const users = {};
  const data = {
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    projects: [],
  };
  users[data.name] = data;
  console.log(users);
  appendDataToUsers(users, "users.json");
  res.send({ loggedIn: "true" });
});

// login existing user
app.post("/api/login", (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };

  const users = JSON.parse(fs.readFileSync("users.json"));
  if (users[data.name] && users[data.name].password === data.password) {
    res.send({ loggedIn: "true" });
  } else {
    res.send({ loggedIn: "false" });
  }
});

//save project
app.post("/api/projects/save", (req, res) => {
  const data = {
    title: req.body.title,
    user: req.body.user,
    projectID: req.body.projectID,
  };
  if (data.title === "" || data.title === undefined) {
    data.title = "Untitled Project";
  }

  appendDataToProjects(data, "projects.json", "users.json");
  res.send("project saved");
});

//save list
app.post("/api/projects/savelist", (req, res) => {
  const data = {
    projectID: req.body.projectID,
    listname: req.body.name,
    nodes: req.body.nodes,
    completedNodes: req.body.completedNodes,
    ID: req.body.ID,
  };
  const list = {
    name: data.listname,
    nodes: data.nodes,
    completedNodes: data.completedNodes,
    id: data.ID,
  };
  const projects = JSON.parse(fs.readFileSync("projects.json"));
  console.log(projects);
  if (projects[data.projectID].list[data.ID] === undefined) {
    projects[data.projectID].list[data.ID] = {};
  }
  Object.assign(projects[data.projectID].list[data.ID], list);
  console.log(projects[data.projectID].list);
  writeData(projects, "projects.json");
  res.send("list saved");
});

//get projects
app.post("/api/projects/get", (req, res) => {
  const user = req.body.user;
  const users = JSON.parse(fs.readFileSync("users.json"));
  const projects = JSON.parse(fs.readFileSync("projects.json"));
  const userProjects = users[user].projects;
  const userProjectsData = [];
  userProjects.forEach((project) => {
    userProjectsData.push(projects[project]);
  });
  res.send(userProjectsData);
});

//delete node
app.post("/api/projects/deletenode", (req, res) => {
  const projectID = req.body.projectID;
  const listID = req.body.listID;
  const nodeID = req.body.nodeID;

  const projects = JSON.parse(fs.readFileSync("projects.json"));
  const list = projects[projectID].list[listID];
  delete list.nodes[nodeID];
  writeData(projects, "projects.json");
  res.send("node deleted");
});

// get project data
app.post("/api/projects/getdata", (req, res) => {
  const projectID = req.body.projectID;
  const projects = JSON.parse(fs.readFileSync("projects.json"));
  const project = {};
  project.title = projects[projectID].title;
  project.projectID = projects[projectID].projectID;
  project.list = [];
  for (const list in projects[projectID].list) {
    project.list.push(projects[projectID].list[list]);
  }
  res.send(project);
});

app.listen(PORT, () => {
  console.log("listenting on port:", PORT);
});
