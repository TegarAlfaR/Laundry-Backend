"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order_item.belongsTo(models.Transaction, {
        foreignKey: "transactionId",
        as: "transaction",
      });
      Order_item.belongsTo(models.Service, {
        foreignKey: "serviceId",
        as: "service",
      });
    }
  }
  Order_item.init(
    {
      orderItemId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: DataTypes.INTEGER,
      subtotal: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Order_item",
    }
  );
  return Order_item;
};
