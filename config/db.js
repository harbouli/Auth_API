const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const URI = process.env.MONGODB_URI;
const connectDb = async () => {
  await mongoose.connect(URI, (err) => {
    if (err) throw err;
    console.log("Connected To DATABASE");
  });
};

module.exports = connectDb;
