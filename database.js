let sqllite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let db = new sqllite3.Database(DBSOURCE, (err) => {
  if (err) {
    //cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to SQLlite database");
    db.run(
      `CREATE TABLE user (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username text UNIQUE,
            email text UNIQUE,
            password text,
            created text,
            plan text,
            constraint email_unique UNIQUE (email)
            constraint username_unique UNIQUE (username)
            )`,
      (err) => {
        if (err) {
          //table already created
          console.log(err);
        }
      }
    );
    db.run(
      `CREATE TABLE dailytask (
        dailytask_id INTEGER,
        tasktext text,
        username text,
        unique (dailytask_id)
        )`,
      (err) => {
        if (err) {
          //table already created
          console.log(err);
        }
      }
    );
    db.run(
      `CREATE TABLE projects (
        project_id INTEGER,
        username text,
        projectname text,
        dateaccessed text,
        unique (project_id)
    )`,
      (err) => {
        if (err) {
          //table already created
          console.log(err);
        }
      }
    );
    db.run(
      `CREATE TABLE lists (
        list_id INTEGER,
        project_id INTEGER,
        username text,
        listname text,
        unique (list_id)
      )`,
      (err) => {
        if (err) {
          //table already created
          console.log(err);
        }
      }
    );
    db.run(
      ` CREATE TABLE tasks (
        task_id INTEGER,
        list_id INTEGER,
        username text,
        taskname text,
        completed INTEGER DEFAULT 0,
        unique (task_id)
      )`,
      (err) => {
        if (err) {
          //table already created
          console.log(err);
        }
      }
    );
  }
});

module.exports = db;
