const mongoose = require("mongoose");
const { Schema } = mongoose;
const { model } = mongoose;


const BooksVentaSchema = new Schema({
  isbn13: { type: String },
  title: { type: String },
  desc: { type: String },
  price: { type: Number },
  image: { type: String },
  cantidad: { type: Number },
  priceOld: { type: Number },
});

module.exports = model("booksVenta", BooksVentaSchema);