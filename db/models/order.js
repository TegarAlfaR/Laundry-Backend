"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      order_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_name: DataTypes.STRING,
      address: DataTypes.STRING,
      pickup_time: DataTypes.DATE,
      laundry_category: DataTypes.ENUM("cuci-setrika", "cuci", "setrika"),
      quantity: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM("pending", "success", "failed"),
        defaultValue: "pending",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
