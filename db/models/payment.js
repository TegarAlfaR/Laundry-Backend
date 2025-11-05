"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.Transaction, {
        foreignKey: "transactionId",
        as: "transaction",
      });
    }
  }
  Payment.init(
    {
      paymentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      paymentType: {
        type: DataTypes.STRING,
      },
      paymentStatus: {
        type: DataTypes.ENUM(
          "pending",
          "settlement",
          "capture",
          "deny",
          "cancel",
          "expire",
          "refund"
        ),
        defaultValue: "pending",
      },

      midtransOrderId: {
        type: DataTypes.STRING,
      },
      midtransTransactionId: {
        type: DataTypes.STRING,
      },
      midtransTransactionToken: {
        type: DataTypes.STRING,
      },
      grossAmount: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Payment",
      tableName: "Payments",
    }
  );
  return Payment;
};
