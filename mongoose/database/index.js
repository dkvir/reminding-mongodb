const mongoose = require("mongoose");

module.exports = {
  connectToMongoose: (cb) => {
    mongoose
      .connect("mongodb://localhost:27017/Test")
      .then(() => {
        return cb();
      })
      .catch((err) => {
        console.error("Failed to connect to mongoDB", err);
        return cb(err);
      });
  },
};
