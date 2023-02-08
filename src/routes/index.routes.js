const express = require("express");
const { Router } = express;
const {
  booksForYear,
  createBooks,
  getAuthors,
  getAuthorUnique,
  getBookforIsbn,
  getBookForPrice,
  getBooks,
  getBooksForTitle,
  getRating,
  ordenPrice,
  precioBOok,
} = require("../controllers/controll.books");
const {
  createUsuario,
  deleteAllCart,
  eliminarElmtCart,
  findAssingUser,
  gerOrder,
  getCarrito,
  isAuthenticated,
  login,
  updateCarrito,
  updateUser,
} = require("../controllers/controll.Usuario");
const {
  createVenta,
  deleteAll,
  deleteVenta,
  pagarLibro,
  updateVenta,
  viewVenta,
} = require("../controllers/controll.Venta");

const router = Router();

// Router Books
router.post("/create", createBooks); // crear libro
router.get("/findBook", getBooks); // Traer todos los libros
router.get("/getAuthors/:id", getAuthors); // Busca el autor segun lo que escribas y mandará una lista de autores
router.get("/getAuthorUnique/:id", getAuthorUnique); // Devuelve libros segun el autor que pasaste como parametro
router.get("/getBooksForTitle/:id", getBooksForTitle); // Busca libros segun lo que escribas como titulo y mandará un array de libros
router.get("/getBookForIsbn/:id", getBookforIsbn);
router.post("/getBookForPrice", getBookForPrice); // Busca libros segundo el rango de precio
router.get("/orderPrice", ordenPrice); // Ordena los libros por precio
router.get(`/booksForYear/:id`, booksForYear); // Ordena por precio
router.get(`/precioBook/:id`, precioBOok); // Sacar el precio del book
router.get("/getRating/:id", getRating); // Sacar por rating

router.post("/createventa", createVenta); // Crear venta previa para libro
router.get("/viewventas", viewVenta); // Ver todas las ventas previas
router.delete("/deleteventa/:id", deleteVenta); // Borrar Venta previa
router.put("/updateVenta/:id", updateVenta); // Actualizar venta
router.delete("/deleteAll", deleteAll); // Borrar todas las pre - ventas

router.post("/createUsuario", createUsuario); // Crear usuario
router.post("/loginUsuario", login); // Logear usuario
router.get("/autorizacion", isAuthenticated, (req, res) => {
  res.send("hola");
});
router.put("/updateUser/:id", updateUser); // Añadir elementos al carrito del usuario
router.get("/getCart/:id", getCarrito); // Traer los carritos
router.put("/updateCart/:id", updateCarrito); // Actualizar el pr
router.put("/deleteElemntCart/:id", eliminarElmtCart); // Eliminar elemento dentro de un carrito
router.put("/deleteAllCart/:id", deleteAllCart);

router.post("/api/checkout", pagarLibro);

module.exports = router;
