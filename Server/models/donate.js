"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class donate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      donate.belongsTo(models.users, {
        as: "users",
        foreignKey: {
          name: "userid",
        },
      });
      donate.belongsTo(models.fund, {
        as: "fund",
        foreignKey: {
          name: "fundid",
        },
      });
    }
  }
  donate.init(
    {
      donateAmout: DataTypes.INTEGER,
      status: DataTypes.STRING,
      proofAttachment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "donate",
    }
  );
  return donate;
};
