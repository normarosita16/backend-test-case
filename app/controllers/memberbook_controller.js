// Library

const httpStatus = require("http-status-codes");

// UTILS

const response = require("../libs/utils/response-api");

// MODEL

const db = require("../models/index");
const Op = db.Sequelize.Op;
const Member = db.Member;
const Book = db.Book;
const MemberBook = db.MemberBook;

exports.create = async (req, res) => {
  const { book_id, member_id } = req.body;

  const currentDate = new Date();
  const lastdate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

  const bookcheck = await Book.findOne({
    where: {
      id: book_id,
      stock: { [Op.gt]: 0 },
    },
  });
  if (!bookcheck) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(
        response.error(
          "Bad Request",
          `buku tidak terdaftar / stock sudah habis`
        )
      );
  }
  const membercheck = await Member.findOne({
    where: {
      id: member_id,
      status: "active",
    },
  });
  if (!membercheck) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(response.error("Bad Request", `member tidak terdaftar`));
  } else if (membercheck.borrow_count > 1) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(response.error("Bad Request", `member sudah pinjam lebih dari 2`));
  }

  MemberBook.create({
    book_id,
    member_id,
    borrow_date: currentDate,
    deadline_return_date: lastdate,
    status: "pinjam",
  })

    .then(async (result) => {
      Book.update(
        {
          stock: bookcheck.stock - 1,
        },
        {
          where: { id: book_id },
        }
      );
      Member.update(
        {
          borrow_count: membercheck.borrow_count + 1,
        },
        {
          where: { id: member_id },
        }
      );
      res.status(httpStatus.CREATED).json(response.success("Success", result));
    })

    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateReturn = async (req, res) => {
  const { book_id } = req.body;
  const member_id = req.params.member_id;

  const currentDate = new Date();

  const bookcheck = await Book.findOne({
    where: {
      id: book_id,
    },
  });

  const membercheck = await Member.findOne({
    where: {
      id: member_id,
    },
  });

  const memberbookcheck = await MemberBook.findOne({
    where: {
      member_id: member_id,
      book_id: book_id,
    },
  });

  let status;
  if (new Date(memberbookcheck.deadline_return_date) < currentDate) {
    status = "pinalty";
  } else {
    status = "active";
  }

  MemberBook.update(
    {
      return_date: currentDate,
      status: "dikembalikan",
    },

    {
      where: { member_id: member_id, book_id: book_id },
    }
  )
    .then(async (result) => {
      if (result == 0)
        return res
          .status(httpStatus.NOT_FOUND)
          .json(response.error("Not Found", `Memberbook with ID  Not Found`));

      Book.update(
        {
          stock: bookcheck.stock + 1,
        },
        {
          where: { id: book_id },
        }
      );

      Member.update(
        {
          borrow_count: membercheck.borrow_count - 1,
          status: status,
        },
        {
          where: { id: member_id },
        }
      );

      MemberBook.findByPk(result.id).then((data) => {
        res.status(httpStatus.OK).json(response.success("Success", data));
      });
    })

    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.list = (req, res) => {
  MemberBook.findAll()
    .then((data) => {
      res.status(httpStatus.OK).json(response.success("Success", data));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.view = (req, res) => {
  MemberBook.findByPk(req.params.id)

    .then((result) => {
      if (!result)
        return res
          .status(httpStatus.NOT_FOUND)
          .json(
            response.error(
              "Not Found",
              `Member with ID ${req.params.id} Not Found`
            )
          );

      res.status(httpStatus.OK).json(response.success("Success", result));
    })

    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  await MemberBook.destroy({
    where: { id },
  })

    .then((result) => {
      if (result == 0)
        return res
          .status(httpStatus.NOT_FOUND)
          .json(response.error("Not Found", `Member with ID ${id} Not Found`));

      res.status(httpStatus.OK).json(response.success("Success", {}));
    })

    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
