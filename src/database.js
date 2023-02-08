const dotenv = require("dotenv");
const config = dotenv.config();
const mongoose = require("mongoose");
const MONGODB_URL = require("./config");
config();

export const conexionMong = () => {
  try {
    mongoose.connect(MONGODB_URL);
    console.log("Server run");
  } catch (e) {
    console.log(e.message);
  }
};
