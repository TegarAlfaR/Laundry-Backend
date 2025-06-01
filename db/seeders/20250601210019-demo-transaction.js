"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Transactions", [
      {
        userId: 2,
        address: "Desa sukamulya, RT 9/RW 7, Blok A, Karawang, Jawa Barat",
        pickupTime: new Date(),
        status: "pending",
        totalPrice: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Order_items", [
      {
        transactionId: 1,
        serviceId: 1,
        quantity: null,
        subtotal: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        transactionId: 1,
        serviceId: 3,
        quantity: null,
        subtotal: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Transactions", null, {});
    await queryInterface.bulkDelete("Order_items", null, {});
  },
};
