"use strict";
const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require("bcrypt");

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

    await queryInterface.bulkInsert("Users", [
      {
        role: "admin",
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
        telephone: "08123456789",
        profileImage: process.env.DEFAULT_PROFILE_IMAGE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role: "user",
        name: "coba-user",
        email: "user@gmail.com",
        password: await bcrypt.hash("userlogin", 10),
        telephone: "08123456789",
        profileImage: process.env.DEFAULT_PROFILE_IMAGE,
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
    await queryInterface.bulkDelete("Users", null, {});
  },
};
