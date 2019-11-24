const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Lesson = sequelize.define('lessons', {
  date: {
    type: Sequelize.DATEONLY,
  },
  title: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.INTEGER,
  },
});


module.exports = Lesson;
