const { Op } = require('sequelize');

module.exports.sanitazeDateOnly = (date) => {
  const match = date.match(/\d{4}-\d{2}-\d{2}/g);
  return match ? match[0] : match;
};

module.exports.sanitazeDays = (days) => {
  const daysObj = {};
  days.forEach((day) => {
    if (day >= 0 && day < 7) {
      daysObj[day] = true;
    }
  });
  return daysObj;
};

module.exports.sanitazeDates = (date) => {
  const dates = date.match(/\d{4}-\d{2}-\d{2}/g);
  if (!dates) {
    return false;
  }
  if (dates.length === 1) {
    return dates[0];
  }

  if (dates.length === 2) {
    return {
      [Op.between]: dates,
    };
  }

  return false;
};

module.exports.sanitazeStudentsCount = (studentsCount) => studentsCount.split(',');

module.exports.sanitazeTeacherIds = (teacherIds) => {
  const teachers = typeof teacherIds === 'string' ? teacherIds.split(',') : teacherIds;
  return teachers;
};
