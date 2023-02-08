const mongoose = require("mongoose");
const { Schema } = mongoose;
const { model } = mongoose;

const UsuariosSchema = new Schema({
  correo: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlegnth: 9,
    maxlegnth: 20,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlegnth: 3,
    maxlegnth: 15,
  },
  apellidos: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlegnth: 3,
    maxlegnth: 15,
  },
  pass: {
    type: String,
    required: true,
    minlegnth: 3,
  },
  items: [
    {
      product: {
        _id: { type: Schema.Types.ObjectId, ref: "booksPrueba" },
        isbn13: { type: String },
        title: { type: String },
        desc: { type: String },
        price: { type: Number },
        image: { type: String },
        cantidad: { type: Number },
        priceOld: { type: Number },
      },
    },
  ],
});

module.exports = model("Usuario", UsuariosSchema);

