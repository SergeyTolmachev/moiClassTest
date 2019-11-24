const { Lesson, LessonTeacher } = require('../schemas');

const { calculateDaysOfLessons } = require('../utils');

module.exports.validator = async (ctx) => {
  ctx.checkBody('firstDate', 'Формат даты не соответствует YYYY-MM-DD').validateDates();
  ctx.checkBody('title', 'Title должен быть строкой от 3 до 100 символов').isLength({ min: 3, max: 100 });
  await ctx.checkBody('teacherIds', 'TeachersId не соответствует требуемому формату').validateTeacherIds();
  ctx.checkBody('days', 'days должны быть массивом с элементами от 0 до 6').validateDays();
  ctx.checkBody('lessonsCount', 'lessonsCount должно быть числом').optional().isInt({ min: 0 });
  ctx.checkBody('lastDate', 'Формат даты не соответствует YYYY-MM-DD').optional().validateDates();
};

module.exports.sanitazer = async (ctx) => {
  ctx.sanitize('firstDate').sanitazeDateOnly();
  ctx.sanitize('teacherIds').sanitazeTeacherIds();
  ctx.sanitize('days').sanitazeDays();
  ctx.sanitize('lastDate').sanitazeDateOnly();
};

module.exports.method = async (ctx) => {
  const {
    teacherIds, title, days, firstDate, lessonsCount, lastDate,
  } = ctx.request.body;

  if (lessonsCount && lastDate) {
    return ctx.throw(400, 'lessonsCount и lastDate не могут быть использованы одновременно');
  }

  if (!lessonsCount && !lastDate) {
    return ctx.throw(400, 'Одно из полей lessonsCount либо lastDate должно обязательно присутствовать');
  }

  const daysToCreate = calculateDaysOfLessons({
    lessonsCount, lastDate, days, firstDate,
  });

  const lessons = daysToCreate.map((day) => ({
    date: day,
    title,
    status: 0,
  }));

  const lessonsDb = await Lesson.bulkCreate(lessons);

  const teachers = [];

  lessonsDb.forEach((lesson) => {
    const { id: lesson_id } = lesson.dataValues;
    teacherIds.forEach((id) => {
      teachers.push({ lesson_id, teacher_id: id });
    });
  });

  await LessonTeacher.bulkCreate(teachers);

  const result = lessonsDb.map((lesson) => (lesson.dataValues.id));

  ctx.body = result;
};
