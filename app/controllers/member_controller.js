// Library

const httpStatus = require("http-status-codes");

// UTILS

const response = require("../libs/utils/response-api");

// MODEL

const db = require("../models/index");

const Member = db.Member;
const MemberBook = db.MemberBook;

exports.create = async (req, res) => {
  const { name } = req.body;

  const membercheck = await Member.findAndCountAll({
    where: {
      name: name,
      distinct: true,
    },
  });
  if (membercheck) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(response.error("Bad Request", `member sudah tersedia`));
  }
  Member.create({
    name,
    code: `M${("0" + membercheck.count).slice(-3)}`,
    status: "active",
    borrow_count: 0,
  })

    .then((result) => {
      res.status(httpStatus.CREATED).json(response.success("Success", result));
    })

    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.list = (req, res) => {
  Member.findAll()
    .then((data) => {
      res.status(httpStatus.OK).json(response.success("Success", data));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.view = (req, res) => {
  Member.findByPk(req.params.id)

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

exports.update = async (req, res) => {
  const { status } = req.body;
  const id = req.params.id;

  Member.update(
    {
      status,
    },

    {
      where: { id },
    }
  )
    .then((result) => {
      if (result == 0)
        return res
          .status(httpStatus.NOT_FOUND)
          .json(response.error("Not Found", `Member with ID ${id} Not Found`));

      Member.findByPk(id).then((data) => {
        res.status(httpStatus.OK).json(response.success("Success", data));
      });
    })

    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  const memberbookcheck = await MemberBook.findAll({
    where: {
      member_id: id,
      status: "pinjam",
    },
  });

  if (memberbookcheck.length > 0) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json(
        response.error(
          "Bad Request",
          `member masih punya buku yang belum dikembalikan`
        )
      );
  }

  Member.destroy({
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
