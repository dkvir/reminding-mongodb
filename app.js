const express = require("express");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");
const app = express();

app.use(express.json());

let db;

connectToDb((err) => {
  if (!err) {
    app.listen(4000, () => {
      console.log("app listening port 4000");
    });
    db = getDb();
  }
});

app.get("/works", (req, res) => {
  let works = [];
  const worksPerPage = 3;
  const currentPage = req.query.page || 0;

  db.collection("Works")
    .find()
    .skip(currentPage * worksPerPage)
    .limit(worksPerPage)
    .forEach((work) => works.push(work))
    .then(() => {
      res.status(200).json(works);
    })
    .catch(() => {
      res.status(500).json({ error: "couldn't fetch documents" });
    });
});

app.get("/works/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("Works")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => res.status(200).json(doc))
      .catch((err) =>
        res.status(500).json({ error: "couldn't fetch document" })
      );
  } else {
    res.status(500).json({ error: "not valid id" });
  }
});

app.post("/works", (req, res) => {
  const work = req.body;

  console.log(req);

  db.collection("Works")
    .insertOne(work)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: "couldn't create document" });
    });
});

app.delete("/works/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("Works")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((result) => res.status(200).json(result))
      .catch((err) =>
        res.status(500).json({ error: "couldn't delete document" })
      );
  } else {
    res.status(500).json({ error: "not valid id" });
  }
});

app.patch("/works/:id", (req, res) => {
  const updates = req.body;

  if (ObjectId.isValid(req.params.id)) {
    db.collection("Works")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json("couldn't update document"));
  } else {
    res.status(500).json({ error: "not valid id" });
  }
});
