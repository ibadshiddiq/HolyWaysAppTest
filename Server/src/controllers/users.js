let users = [
  {
    id: 1,
    fullName: "spiderman",
    email: "spiderman@gmail.com",
  },
  {
    id: 2,
    fullName: "Andi",
    email: "andi@kfcsupport.com",
  },
  {
    id: 3,
    fullName: "surti",
    email: "surti@gmail.com",
  },
];

exports.addUser = async (req, res) => {
  try {
    const data = req.body;
    users = [...users, data];
    res.send({ users });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    res.send({
      status: "Success",
      data: {
        users: users,
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

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const checkUser = users.find((data) => data.id == id);

    if (!checkUser) {
      return res.send({
        status: "failed",
        message: "data Not Found",
      });
    }

    users = users.map((user) => {
      if (user.id == id) {
        return id, data;
      } else {
        return user;
      }
    });

    res.send({ status: "success", data: users });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const checkUser = users.find((data) => data.id == id);

    if (!checkUser) {
      return res.send({
        status: "failed",
        message: "data Not Found",
      });
    }

    users = users.filter((user) => user.id != id);

    res.send({
      status: "success",
      data: {
        id: id,
      },
    });

    res.send({ status: "success", data: users });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
