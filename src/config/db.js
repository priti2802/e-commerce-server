const mongoose = require("mongoose");

async function connectDB() {
  try {
    const MONGODB_URL =
      process.env["MONGODB_SERVER_URL_" + process.env.RUN_MODE];
    await mongoose.connect(MONGODB_URL);
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDB;
