const { users } = require("../../models");

exports.getUser = async (req, res) => {
  try {
    const data = await users.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    res.send({
      status: "success",
      data: {
        users: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await users.findOne({
      where: {
        id,
      },
    });

    if (user) {
      await users.destroy({
        where: {
          id,
        },
      });

      return res.status(200).send({
        status: "success",
        message: "delete success",
        data: {
          id,
        },
      });
    }
    res.status(404).send({
      status: "failed",
      message: "no data found",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
