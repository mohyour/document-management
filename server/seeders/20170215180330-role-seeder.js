const roleValues = require('../../data.json').role;

module.exports = {
  up(queryInterface, Sequelize) {
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.
    return queryInterface.bulkInsert('Roles', [{
      title: roleValues.roleOne || process.env.ROLEONE,
      createdAt: Sequelize.fn(('NOW')),
      updatedAt: Sequelize.fn(('NOW'))
    }, {
      title: roleValues.roleTwo || process.env.ROLETWO,
      createdAt: Sequelize.fn(('NOW')),
      updatedAt: Sequelize.fn(('NOW'))
    }], {});
  },

  down(queryInterface, Sequelize) {
      // Add reverting commands here.
      // Return a promise to correctly handle asynchronicity.
    return queryInterface.bulkDelete('Roles', null, {});
  }
};