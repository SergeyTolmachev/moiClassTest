const validator = require('validator');
const { Teacher } = require('../schemas/');

module.exports.validateDays = (days) => {
  days.forEach((day) => {
    try {
      validator.isNumeric(`${day}`);
    } catch (error) {
      return false;
    }
    if (day < 0 && day > 7) {
      return false;
    }
  });
  return true;
};

module.exports.validateStudentsCount = (studentsCount) => {
  const values = studentsCount.split(',');

  if (values.length > 0 && values.length < 3) {
    try {
      values.forEach((value) => (validator.isNumeric(String(value))));
    } catch (error) {
      return false;
    }
    return true;
  }
  return false;
};

module.exports.validateDates = (date) => {
  const dates = date.match(/\d{4}-\d{2}-\d{2}/g);
  if (!dates) {
    return false;
  }
  const { length } = dates;

  return length > 0 && length < 3;
};

module.exports.validateTeacherIds = async (teacherIds) => {
  const teachers = typeof teacherIds === 'string' ? teacherIds.split(',') : teacherIds;
  for (let i = 0; i < teachers.length; i += 1) {
    const id = teachers[i];
    try {
      const validation = validator.isNumeric(`${id}`);
      if (!validation) {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  const teachersDb = await Teacher.findAll({ where: { id: teachers } });
  return teachersDb.length === teachers.length;
};
