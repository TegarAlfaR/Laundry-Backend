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
    await queryInterface.bulkInsert(
      "Orders",
      [
        {
          user_name: "tes laundry",
          address: "karawang, indonesia",
          pickup_time: new Date(),
          laundry_category: "cuci-setrika",
          quantity: 1,
          total_price: 7000,
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_name: "tegar",
          address: "karawang, indonesia",
          pickup_time: new Date(),
          laundry_category: "setrika",
          quantity: 2,
          total_price: 8000,
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
