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
    await queryInterface.bulkInsert("Services", [
      {
        laundryCategory: "cuci-setrika",
        price: 7000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        laundryCategory: "cuci",
        price: 4000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        laundryCategory: "setrika",
        price: 4000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        laundryCategory: "boneka-size-s",
        price: 7000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        laundryCategory: "boneka-size-m",
        price: 12000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        laundryCategory: "boneka-size-xl",
        price: 20000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        laundryCategory: "karpet",
        price: 15000,
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
    await queryInterface.bulkDelete("Services", null, {});
  },
};
