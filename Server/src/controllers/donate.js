const { users, fund, donate } = require("../../models");
const fs = require("fs");

// exports.getDonate = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const product = await fund.findOne({
//       where: {
//         fundid,
//       },

//       include: [
//         {
//           model: users,
//           as: "users",
//           attributes: {
//             exclude: ["createdAt", "updatedAt", "password"],
//           },
//         },
//         {
//           model: fund,
//           as: "categories",
//           through: {
//             model: donate,
//             as: "donate",
//             attributes: [],
//           },
//           attributes: {
//             exclude: ["createdAt", "updatedAt"],
//           },
//         },
//       ],
//     });

//     res.status(200).send({
//       status: "success",
//       data: {
//         product,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       status: "failed",
//       message: "server error",
//     });
//   }
// };

exports.getDonate = async (req, res) => {
  try {
    const donations = await donate.findAll({
      include: [
        {
          model: users,
          as: "users",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },

        {
          model: fund,
          as: "fund",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],

      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        donations,
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

// exports.createDonate = async (req, res) => {
//   const data = req.body;

//   try {
//     const donates = await donate.create({
//       userid,
//       fundid,
//       donateAmount,
//       status,
//       proofAttachment,
//     });

//     res.status(200).send({
//       status: "success",
//       data: {
//         donates,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       status: "failed",
//       message: "server error",
//     });
//   }
// };

exports.createDonate = async (req, res) => {
  try {
    const proofAttachment = req.files.proofAttachment[0].filename;
    // const user = await users.findOne({ where: { id: userid } });
    // const funds = await users.findOne({ where: { id: fundid } });
    const donates = await donate.create({
      ...req.body,
      proofAttachment,
    });

    res.status(200).send({
      status: "success",
      data: {
        donate: {
          id: donates.id,
          donateAmout: donates.donateAmout,
          status: donates.status,
          proofAttachment: donates.proofAttachment,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "something went wrong",
    });
  }
};

// exports.createDonate = async (req, res) => {
//   try {
//     const proofAttachmentimage = req.files.proofAttachment[0].filename;

//     const datadonate = await donate.create({
//       ...req.body,
//       proofAttachmentimage,
//     });

//     res.status(200).send({
//       status: "success",
//       data: {
//         donate: {
//           id: datadonate.id,
//           donateAmout: datadonate.donateAmout,
//           status: datadonate.status,
//           proofAttachment: datadonate.proofAttachment,
//         },
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       status: "failed",
//       message: "server error",
//     });
//   }
// };

exports.deleteDonate = async (req, res) => {
  try {
    const id = req.params.id;

    const findDonate = await donate.findOne({ where: { id } });

    if (!findDonate) {
      return res.send({
        status: "failed",
        message: "Data not found",
      });
    }

    //   fs.unlink(`uploads/${findFund.thumbnail}`, (err) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //   });

    await donate.destroy({ where: { id } });

    res.status(200).send({
      status: "success",
      data: { id: findDonate.id },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

// exports.deleteDonate = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const donatee = await donate.findOne({
//       where: {
//         id,
//       },
//     });

//     if (fund) {
//       await donate.destroy({
//         where: {
//           id,
//         },
//       });

//       return res.status(200).send({
//         status: "success",
//         message: "resource has been deleted",
//         data: {
//           id: 1,
//         },
//       });
//     }
//     res.status(404).send({
//       status: "failed",
//       message: "resource not found",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       status: "failed",
//       message: "server error",
//     });
//   }
// };
