const mongoose = require("mongoose")
const dotenv = require("dotenv");

const express = require("express");
const cors = require("cors");
const router = require("./routes/index.routes");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();

try {
  mongoose.connect(process.env.MONGO_URL);
  console.log("connectado ");
} catch (e) {
  console.log(e.message);
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const port = process.env.PORT || 3000;

app.listen(port);
console.log("server on port", 3000);