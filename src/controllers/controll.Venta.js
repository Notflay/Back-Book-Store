const Stripe = require("stripe")
const BooksVenta = require("../model/BooksVenta");

exports.createVenta = async (req, res) => {
  try {
    const { body } = req;
    const bookVenta = new BooksVenta({
      isbn13: body.isbn13,
      title: body.title,
      desc: body.desc,
      price: body.price,
      image: body.image,
      cantidad: body.cantidad,
      priceOld: body.priceOld,
    });
    await bookVenta.save();
    res.status(201).send(bookVenta);
  } catch (error) {
    res.status(501).send(error);
  }
};

exports.viewVenta = async (req, res) => {
  try {
    const booksVenta = await BooksVenta.find();
    res.status(201).send(booksVenta);
  } catch (error) {
    res.status(501).send(error);
  }
};

exports.deleteVenta = async (req, res) => {
  try {
    const { id } = req.params;

    await BooksVenta.findByIdAndDelete(id);
    res.status(201).send("Eliminado exitosamente");
  } catch (error) {
    res.status(501).send(error);
  }
};

exports.deleteAll = async (req, res) => {
  try {
    await BooksVenta.remove();
    res.status(201).send("Eliminado exitosamente");
  } catch (error) {
    res.status(501).send(error.message);
  }
};

exports.updateVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await BooksVenta.findByIdAndUpdate(id, body);
    res.status(201).send("Actualizado extiosamente");
  } catch (error) {
    res.status(501).send(error);
  }
};

const stripe = new Stripe(
  "sk_test_51MWLL2L4SPD0MxRcfb9N2nCJEha2yHeq5KGmai4aSsE0HkYaAbXpt4Vb77CWyKmGJ7YIu7JFr8bhIxMsxUS4dSL700mDqxEyS1"
);

exports.pagarLibro = async (req, res) => {
  try {
    let { id, amount } = req.body;

    amount = parseInt(amount);

    const payment = await stripe.paymentIntents.create({
      amount: amount,
      description: "books",
      currency: "USD",
      payment_method: id,
      confirm: true,
    });
    console.log("si");
    console.log(payment);

    res.send({ message: "Succesfull payment" });
  } catch (error) {
    res.send({ error: error.raw.message });
  }
};
