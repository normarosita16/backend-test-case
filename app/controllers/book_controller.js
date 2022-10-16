// Library

const httpStatus = require("http-status-codes");

// UTILS

const response = require("../libs/utils/response-api");

// MODEL

const db = require("../models/index");

const Book = db.Book;

exports.create = async (req, res) => {
  const currentDate = new Date();
  const timestamp = `${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}`;

  const { title, author, stock } = req.body;

  const bookcheck = await Book.findOne({
    where: {
      title: title,
    },
  });
  if (bookcheck) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(response.error("Bad Request", `title sudah tersedia`));
  }

  Book.create({
    title,
    author,
    stock,
    code: `BOOK/${currentDate.getMonth() + 1}${currentDate
      .getFullYear()
      .toString()
      .substr(-2)}/${timestamp}`,
  })

    .then((result) => {
      res.status(httpStatus.CREATED).json(response.success("Success", result));
    })

    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.list = (req, res) => {
  Book.findAll()
    .then((data) => {
      res.status(httpStatus.OK).json(response.success("Success", data));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.view = (req, res) => {
  Book.findByPk(req.params.id)

    .then((result) => {
      if (!result)
        return res
          .status(httpStatus.NOT_FOUND)
          .json(
            response.error(
              "Not Found",
              `Book with ID ${req.params.id} Not Found`
            )
          );

      res.status(httpStatus.OK).json(response.success("Success", result));
    })

    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = async (req, res) => {
  const { stock } = req.body;
  const id = req.params.id;

  const bookstock = await Book.findOne({
    where: {
      id: id,
    },
  });

  const stockbook = bookstock.stock + stock;

  Book.update(
    {
      stock: stockbook,
    },

    {
      where: { id },
    }
  )
    .then((result) => {
      if (result == 0)
        return res
          .status(httpStatus.NOT_FOUND)
          .json(response.error("Not Found", `Book with ID ${id} Not Found`));

      Book.findByPk(id).then((data) => {
        res.status(httpStatus.OK).json(response.success("Success", data));
      });
    })

    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  await Book.destroy({
    where: { id },
  })

    .then((result) => {
      if (result == 0)
        return res
          .status(httpStatus.NOT_FOUND)
          .json(response.error("Not Found", `Book with ID ${id} Not Found`));

      res.status(httpStatus.OK).json(response.success("Success", {}));
    })

    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
