const { DateTime } = require('luxon');

const validators = require('./validators');
const sanitazers = require('./sanitazers');

const { DAYS_IN_YEAR, DAYS_LIMIT } = require('../config/constants');

module.exports.calculateDaysOfLessons = (data) => {
  const {
    lessonsCount, firstDate, days,
  } = data;

  let { lastDate } = data;
  lastDate = DateTime.fromISO(lastDate);

  const startDate = DateTime.fromISO(firstDate);

  let daysAddedCount = 0;

  const daysArr = [];

  for (let i = 1; i <= DAYS_IN_YEAR; i += 1) {
    const currentDate = startDate.plus({ days: i });
    let currentWeekDay = currentDate.weekday;
    currentWeekDay = currentWeekDay === 7 ? 0 : currentWeekDay;

    if (days[currentWeekDay]) {
      daysArr.push(currentDate.toISODate());
      daysAddedCount = daysAddedCount + 1;
    }

    if (daysAddedCount === DAYS_LIMIT) {
      break;
    }

    if (lessonsCount && daysAddedCount === lessonsCount) {
      break;
    }

    if (currentDate >= lastDate) {
      break;
    }
  }
  return daysArr;
};

module.exports.compareStudentsCount = (values, length) => {
  const [from, to] = values;

  // Если значений два, то количество студентов должно быть в промежутке, включая крайние значения
  if (from && to) {
    return +from <= length && length <= +to;
  }

  // Если значение одно, то количество студентов равно этому значению
  if (from) {
    return +from === length;
  }
  return false;
};

module.exports.validators = validators;
module.exports.sanitazers = sanitazers;
