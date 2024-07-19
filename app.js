const express = require("express");
const { connectToDb, getDb } = require("./db");
const app = express();

let db;

connectToDb((err) => {
  if (!err) {
    app.listen(4000, () => {
      console.log("app listening port 4000");
    });
    db = getDb();
  }
});

app.get("/works", function (req, res) {
  let works = [];

  db.collection("Works")
    .find()
    .sort({ title: 1 })
    .forEach((work) => works.push(work))
    .then(() => {
      res.status(200).json(works);
    })
    .catch(() => {
      res.status(500).json({ error: "couldn't fetch documents" });
    });
});
