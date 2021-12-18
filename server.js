const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// CONNETION WITH DATABASE

const URI = process.env.MONGODB_URI;

mongoose.connect(URI);
mongoose.connection
  .once("open", () => console.log("Connected to"))
  .on("error", (error) => {
    console.log("Connection error: ", error);
  });

// Routes

app.use("/api", require("./routers/authRouter"));

// PORT LISTNER

const PORT = `${process.env.PORT}` || 3300;
app.listen(PORT, () => {
  console.log(`Server Running In Port ${PORT}`);
});
