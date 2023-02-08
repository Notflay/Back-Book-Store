const BooksPrueba = require("../model/BooksPrueba");

exports.createBooks = async (req, res) => {
  try {
    const { body } = req;
    const booksPrueba = new BooksPrueba({
      authors: body.authors,
      desc: body.desc,
      error: body.error,
      image: body.image,
      isbn10: body.isbn10,
      isbn13: body.isbn13,
      language: body.language,
      pages: body.pages,
      price: body.price,
      publisher: body.publisher,
      rating: body.rating,
      subtitle: body.subtitle,
      title: body.title,
      url: body.url,
      year: body.year,
    });
    await booksPrueba.save();
    res.status(201).send("Creado exitosamente");
  } catch (error) {
    res.status(501).send(error);
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await BooksPrueba.find();
    res.status(201).send(books);
  } catch (error) {
    res.status(501).send(error);
  }
};

exports.getAuthors = async (req, res) => {
  try {
    const { id } = req.params;
    let lista = [];
    const books = await BooksPrueba.find({
      authors: new RegExp(`${id}`),
    });
    books.map((book) => {
      lista.push(book.authors);
    });
    res.status(201).send(lista);
  } catch (error) {
    res.status(501).send(error);
  }
};

exports.getBooksForTitle = async (req, res) => {
  try {
    const { id } = req.params;
    const books = await BooksPrueba.find({
      title: new RegExp(`${id}`),
    });
    res.status(201).send(books);
  } catch (error) {
    res.status(501).send(error);
  }
};

exports.getAuthorUnique = async (req, res) => {
  try {
    const { id } = req.params;
    const books = await BooksPrueba.find({
      authors: id,
    });
    res.status(201).send(books);
  } catch (error) {
    res.status(501).send(error);
  }
};

exports.getBookforIsbn = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BooksPrueba.findOne({
      isbn13: id,
    });
    res.status(201).send(book);
  } catch (error) {
    res.status(501).send(error);
  }
};

exports.getBookForPrice = async (req, res) => {
  try {
    const { body } = req;
    const books = await BooksPrueba.find();

    let lista = [];

    const menor = body.menor;
    const mayor = body.mayor;
    books.map((book) => {
      if (
        parseFloat(book.price.slice(1)) > menor &&
        parseFloat(book.price.slice(1)) < mayor
      ) {
        lista.push(book);
      }
    });
    res.status(201).send(lista);
  } catch (error) {
    res.status(501).send(error);
  }
};

exports.ordenPrice = async (req, res) => {
  try {
    const books = await BooksPrueba.find();

    books.sort(function (a, b) {
      if (parseFloat(a.price.slice(1)) > parseFloat(b.price.slice(1))) {
        return 1;
      }
      if (parseFloat(a.price.slice(1)) < parseFloat(b.price.slice(1))) {
        return -1;
      }
      return 0;
    });

    res.status(201).send(books);
  } catch (error) {
    res.status(501).send(error);
  }
};

exports.booksForYear = async (req, res) => {
  try {
    const { id } = req.params;
    const books = await BooksPrueba.find({ year: id });

    res.status(201).send(books);
  } catch (error) {
    res.status(501).send(error);
  }
};

exports.precioBOok = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BooksPrueba.findOne({ isbn13: id });
    res.status(201).send(book.price);
  } catch (error) {
    res.status(501).send(error);
  }
};

exports.getRating = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const books = await BooksPrueba.find({
      rating: `${id}`,
    });
    res.status(201).send(books);
  } catch (err) {
    res.status(501).send(err);
  }
};
