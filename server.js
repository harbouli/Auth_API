const express = require("express");
require("dotenv").config();
// const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDb = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// CONNETION WITH DATABASE

connectDb();

app.get("/", (req, res) => {
  res.json({ msg: "Hello" });
});

// PORT LISTNER

const PORT = `${process.env.PORT}` || 3300;
app.listen(PORT, () => {
  console.log(`Server Running In Port ${PORT}`);
});
