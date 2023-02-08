const mongoose = require("mongoose");
const { Types } = mongoose;
// Importing required packages
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usuario = require("../model/Usuarios");
const express = require("express");


const signToken = (_id) => jwt.sign({ _id }, process.env.SECRET);

exports.findAssingUser = async (req, res, next) => {
  try {
    var token = req.cookies.jwtToken;
    if (!token) {
      res.status(401).send("Unathorized token");
      res.cookie("autorizado", false);
    }

    let userId = jwt.verify(token, process.env.SECRET)._id;

    const user = await Usuario.findById(userId);

    if (!user) {
      res.status(401).send("Usuario no existe").end();
      res.cookie("autorizado", false);
    }

    req.auth = user;
    res.cookie("autorizado", true);
    next();
  } catch (error) {
    next(error);
  }
};

const { findAssingUser } = require('../controllers/controll.Usuario');

const isAuthenticated = express.Router().use(findAssingUser);
module.exports = {
  isAuthenticated
};

module.exports.createUsuario = async (req, res) => {
  try {
    const { body } = req;
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(body.pass, salt);
    console.log(body);

    const usuario = Usuario({
      correo: body.correo,
      nombre: body.nombre,
      apellidos: body.apellidos,
      pass: hashed,
      salt,
    });

    if (usuario) {
      await usuario.save();
    } else {
      console.log("No se puso crear el usuario");
    }
    res.status(201).send(usuario);
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { body } = req;
    const usuario = await Usuario.findOne({ correo: body.correo });
    if (!usuario) {
      return res.status(401).send("Usuario y/o contraseña no existe");
    } else {
      const compare = await bcrypt.compare(body.pass, usuario.pass);
      if (!compare) {
        return res.status(403).send("Usuario y/o contraseña no existe");
      } else {
        console.log(usuario);
        const sign = signToken(usuario._id);
        const obj = {
          sign,
          id: usuario._id,
        };
        res.cookie("jwtToken", sign);
        res.status(200).send(obj);
      }
    }
  } catch (error) {
    res.status(403).send(error.message);
  }
};

// Añadir otro elemento en tu lista de productos
module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    await Usuario.findByIdAndUpdate(
      { _id: `${id}` },
      {
        $push: {
          items: {
            product: body,
          },
        },
      }
    );
    res.status(201).send("Actualizado");
  } catch (error) {
    res.status(501).send(error.message);
  }
};

module.exports.getCarrito = async (req, res) => {
  try {
    const { id } = req.params;

    const dataUse = await Usuario.find(
      { _id: id },
      { _id: false, items: true }
    );

    let list = [];
    const data = dataUse[0];

    data.items.map((data) => list.push({ ...data.product, id: data._id }));

    res.status(201).send(list);
  } catch (error) {
    res.status(501).send(error.message);
  }
};

module.exports.updateCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const search = `items.${body.order}.product.cantidad`;
    const price = `items.${body.order}.product.price`;
    body.cantidad = parseFloat(body.cantidad);
    await Usuario.updateOne(
      { _id: id },
      {
        [search]: body.cantidad,
        [price]: (body.cantidad * body.priceOld).toFixed(2),
      }
    ); 
    res.status(201).send("Exitoso");
  } catch (error) {
    res.status(501).send(error.message);
  }
};

module.exports.eliminarElmtCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const elementId = Object.keys(body)[0];

    await Usuario.updateOne(
      { _id: id },
      { $pull: { items: { _id: Types.ObjectId(`${elementId}`) } } }
    );
    res.status(201).send("Exitoso");
  } catch (error) {
    res.status(501).send(error.message);
  }
};

module.exports.deleteAllCart = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await Usuario.updateOne({ _id: id }, { $set: { items: [] } });
    res.status(201).send("exitoso");
  } catch (error) {
    res.status(501).send(error.message);
  }
};

/* export const gerOrder = async (req, res) => {
  try {
    const i = Types.ObjectId("63e2ebede06fdcc2215ffe6a");
    const index = await Usuario.aggregate([
      {
        $match: {
          _id: Types.ObjectId("63d5b93267fac36d21c5e21a"),
        },
      },
      {
        $unwind: "$items",
      },
      {
        $match: {
          "items._id": i,
        },
      },
      {
        $group: {
          _id: "$_id",
          items: {
            $push: "$items",
          },
          index: {
            $first: {
              $indexOfArray: ["$items._id", i],
            },
          },
        },
      },
      {
        $project: {
          _id: "$_id",
          items: "$items",
          index: "$index",
          position: {
            $add: ["$index", 1],
          },
        },
      },
    ]);
    res.status(201).send(index);
  } catch (error) {
    res.status(501).send(error.message);
  }
};
 */
