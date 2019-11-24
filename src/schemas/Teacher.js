const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Teacher = sequelize.define('teachers', {
  name: {
    type: Sequelize.STRING,
  },
});

module.exports = Teacher;
