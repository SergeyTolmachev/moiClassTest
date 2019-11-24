const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Lesson = require('./Lesson');
const Teacher = require('./Teacher');

const LessonTeacher = sequelize.define('lesson_teachers', {
  lesson_id: {
    type: Sequelize.INTEGER,
    reference: {
      model: Lesson,
      key: 'id',
    },
  },
  teacher_id: {
    type: Sequelize.INTEGER,
    reference: {
      model: Teacher,
      key: 'id',
    },
  },
});

module.exports = LessonTeacher;
