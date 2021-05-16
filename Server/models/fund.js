"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class fund extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      fund.hasMany(models.donate, {
        as: "donate",
        foreignKey: {
          name: "fundid",
        },
      }),
        fund.belongsTo(models.users, {
          as: "users",
          foreignKey: {
            name: "userid",
          },
        });
    }
  }
  fund.init(
    {
      title: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      description: DataTypes.STRING,
      goal: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "fund",
    }
  );
  return fund;
};
