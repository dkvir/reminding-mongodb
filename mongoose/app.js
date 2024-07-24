const express = require("express");
const app = express();
const { connectToMongoose } = require("./database");
const mongoose = require("mongoose");
const {
  getWorks,
  getWork,
  postWork,
  deleteWork,
  updateWork,
} = require("./resolver");

app.use(express.json());

connectToMongoose((err) => {
  if (!err) {
    app.listen(4000, () => {
      console.log("app listening port 4000");
    });
  }
});

app.get("/works", (req, res) => {
  getWorks()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(500).json({ error: "couldn't fetch documents" })
    );
});

app.get("/works/:id", (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    getWork(req.params.id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) =>
        res.status(500).json({ error: "couldn't fetch documents" })
      );
  } else {
    res.status(500).json({ error: "not valid id" });
  }
});

app.post("/works", (req, res) => {
  const work = req.body;
  console.log(req.body);

  postWork(work)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "couldn't create document" });
    });
});

app.delete("/works/:id", (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    deleteWork(req.params.id)
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

  if (mongoose.isValidObjectId(req.params.id)) {
    updateWork({ _id: new mongoose.Types.ObjectId(req.params.id) }, updates)
      .then((result) => res.status(200).json(result))
      .catch((err) =>
        res.status(500).json({ error: "couldn't update document" })
      );
  } else {
    res.status(500).json({ error: "not valid id" });
  }
});
