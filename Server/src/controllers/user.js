const { users } = require("../../models");
const fs = require("fs");

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

exports.getUserDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await users.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!data) {
      return res.send({
        status: "failed",
        message: "data not found",
      });
    }

    res.status(200).send({
      status: "success",
      data: { users: data },
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

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const finduser = await users.findOne({ where: { id } });

    if (!finduser) {
      return res.send({
        status: "failed",
        message: "data not found",
      });
    }

    if (req.files) {
      var thumbnail = req.files.thumbnail[0].filename;
      fs.unlink(`uploads/${finduser.thumbnail}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    const datauser = {
      ...req.body,
      thumbnail,
    };

    await users.update(datauser, {
      where: { id },
    });

    const updateUser = await users.findOne({
      where: { id },
      attributes: { exclude: ["updatedAt", "createdAt"] },
    });

    res.status(200).send({
      status: "Success",
      data: {
        user: {
          name: updateUser.name,
          email: updateUser.email,
          thumbnail: updateUser.thumbnail,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error WKWKKWW",
    });
  }
};
