const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Student = sequelize.define('students', {
  name: {
    type: Sequelize.STRING,
  },
});

module.exports = Student;
