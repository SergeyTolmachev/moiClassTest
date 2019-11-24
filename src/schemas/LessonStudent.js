const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Lesson = require('./Lesson');
const Student = require('./Student');

const LessonStudent = sequelize.define('lesson_students', {
  lesson_id: {
    type: Sequelize.INTEGER,
    reference: {
      model: Lesson,
      key: 'id',
    },
  },
  student_id: {
    type: Sequelize.INTEGER,
    reference: {
      model: Student,
      key: 'id',
    },
  },
  visit: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = LessonStudent;
