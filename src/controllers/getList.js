const _ = require('underscore');

const { compareStudentsCount } = require('../utils');

const { Student, Teacher, Lesson } = require('../schemas');
const { DEFAULT_LIMIT, DEFAULT_OFFSET } = require('../config/constants');

module.exports.validator = async (ctx) => {
  ctx.checkQuery('date', 'Формат даты не соответствует YYYY-MM-DD').optional().validateDates();
  ctx.checkQuery('status', 'Status должен быть 0 лиюо 1').optional().isIn(['0', '1']);
  await ctx.checkQuery('teacherIds', 'TeachersId не соответствует требуемому формату').optional().validateTeacherIds();
  ctx.checkQuery('lessonsPerPage', 'lessonsPerPage должно быть числом от 1 до 300').optional().isInt({ min: 1, max: 300 });
  ctx.checkQuery('page', 'page должно быть числом, начиная с 1').optional().isInt({ min: 1 });
  ctx.checkQuery('studentsCount', 'studentsCount не соответствует требуемому формату').optional().validateStudentsCount();
};

module.exports.sanitazer = async (ctx) => {
  ctx.sanitize('date').sanitazeDates();
  ctx.sanitize('status').toInt();
  ctx.sanitize('teacherIds').sanitazeTeacherIds();
  ctx.sanitize('lessonsPerPage').toInt();
  ctx.sanitize('page').toInt();
  ctx.sanitize('studentsCount').sanitazeStudentsCount();
};

module.exports.method = async (ctx) => {
  const {
    date, status, teacherIds, studentsCount, page, lessonsPerPage,
  } = ctx.query;

  const where = {};

  if (date) {
    where.date = date;
  }

  if (status || status === 0) {
    where.status = status;
  }

  const teacherModel = {
    model: Teacher,
  };

  if (teacherIds) {
    teacherModel.where = { id: teacherIds };
  }

  const limit = lessonsPerPage || DEFAULT_LIMIT;
  const offset = page ? (page - 1) * limit : DEFAULT_OFFSET;

  const lessons = await Lesson.findAll({
    where,
    limit,
    offset,
    order: ['id'],
    include: [{ model: Student }, teacherModel],
  });

  const result = lessons.map((lesson) => {
    let { students, teachers, ...rest } = lesson.dataValues;

    let visitCount = 0;

    students = students.map(({ dataValues }) => {
      const { id, name, lesson_students } = dataValues;
      const { visit } = lesson_students;
      if (visit) {
        visitCount = visitCount + 1;
      }
      return {
        id, name, visit,
      };
    });

    teachers = teachers.map(({ dataValues }) => {
      const { id, name } = dataValues;
      return { id, name };
    });

    if (!studentsCount || compareStudentsCount(studentsCount, students.length)) {
      return {
        ...rest, visitCount, students, teachers,
      };
    }
  });
  ctx.body = _.compact(result);
};
