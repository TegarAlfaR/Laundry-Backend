"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Payments", {
      paymentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      transactionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Transactions",
          key: "transactionId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      paymentType: {
        type: Sequelize.STRING,
      },
      paymentStatus: {
        type: Sequelize.ENUM("pending", "paid", "failed", "cancelled"),
        defaultValue: "pending",
      },
      midtransOrderId: Sequelize.STRING,
      midtransTransactionId: Sequelize.STRING,
      midtransTransactionToken: Sequelize.STRING,
      grossAmount: Sequelize.INTEGER,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Payments");
  },
};
