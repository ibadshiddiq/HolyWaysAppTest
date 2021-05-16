const { fund, donate } = require("../../models");
const fs = require("fs");

exports.getFund = async (req, res) => {
  try {
    let datafund = await fund.findAll({
      include: [
        {
          model: donate,
          as: "donate",
          attributes: {
            exclude: ["createdAt", "updatedAt", "fundid", "userid"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
    });

    res.status(200).send({
      status: "success",
      data: { fund: datafund },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getFundsDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const datafund = await fund.findOne({
      where: {
        id,
      },
      include: [
        {
          model: donate,
          as: "donate",
          attributes: {
            exclude: ["createdAt", "updatedAt", "fundid", "userid"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "fundid", "userid"],
      },
    });

    if (!datafund) {
      return res.send({
        status: "failed",
        message: "data not found",
      });
    }

    res.status(200).send({
      status: "success",
      data: { fund: datafund },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.createFund = async (req, res) => {
  try {
    const thumbnail = req.files.thumbnail[0].filename;

    const datafund = await fund.create({
      ...req.body,
      thumbnail,
    });

    res.status(200).send({
      status: "success",
      data: {
        fund: {
          id: datafund.id,
          title: datafund.title,
          thumbnail: datafund.thumbnail,
          description: datafund.description,
          goal: datafund.goal,
          donate: [],
        },
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

exports.updateFund = async (req, res) => {
  try {
    const { id } = req.params;

    const findfund = await fund.findOne({ where: { id } });

    if (!findfund) {
      return res.send({
        status: "failed",
        message: "data not found",
      });
    }

    if (req.files) {
      var thumbnail = req.files.thumbnail[0].filename;
      fs.unlink(`uploads/${findfund.thumbnail}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    const datafund = {
      ...req.body,
      thumbnail,
    };

    await fund.update(datafund, {
      where: { id },
    });

    const updateFund = await fund.findOne({
      where: { id },
      attributes: { exclude: ["updatedAt", "createdAt"] },
    });

    res.status(200).send({
      status: "Success",
      data: {
        fund: {
          title: updateFund.title,
          goal: updateFund.goal,
          description: updateFund.description,
          thumbnail: updateFund.thumbnail,
          donate: [],
        },
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

exports.deleteFund = async (req, res) => {
  try {
    const id = req.params.id;

    const findFund = await fund.findOne({ where: { id } });

    if (!findFund) {
      return res.send({
        status: "failed",
        message: "Data not found",
      });
    }

    fs.unlink(`uploads/${findFund.thumbnail}`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    await fund.destroy({ where: { id } });

    res.status(200).send({
      status: "success",
      data: { id: findFund.id },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.updateDonate = async (req, res) => {
  try {
    const { fundid, userid } = req.params;

    const dataDonate = {
      ...req.body,
    };

    await donate.update(dataDonate, {
      where: { id: userid },
    });

    const updateFund = await fund.findOne({
      where: { id: fundid },
      include: [
        {
          model: donate,
          as: "donate",
          attributes: {
            exclude: ["createdAt", "updatedAt", "fundid", "userid"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "fundid", "userid"],
      },
    });

    res.status(200).send({
      status: "Success",
      data: updateFund,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
