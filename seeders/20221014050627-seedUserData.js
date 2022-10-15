"use strict";

const { hashedPassword } = require("../helpers/bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    let dataUsers = require("../db/user.json");
    dataUsers.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      el.password = hashedPassword(el.password);
    });
    await queryInterface.bulkInsert("Users", dataUsers);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null);
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
