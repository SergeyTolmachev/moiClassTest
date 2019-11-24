const { expect } = require('chai');
const { calculateDaysOfLessons, compareStudentsCount } = require('../src/utils');

describe('Test calculateDaysOfLessons', () => {
  it('test calculateDaysOfLessons, lessonsCount = 365', () => {
    const newLessons = calculateDaysOfLessons({
      lessonsCount: 365,
      firstDate: '2019-01-01',
      days: {
        0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true,
      },
    });
    expect(newLessons.length).to.equal(300);
  });
  it('test calculateDaysOfLessons, lastDate = 2022-01-01', () => {
    const newLessons = calculateDaysOfLessons({
      lastDate: '2022-01-01',
      firstDate: '2019-01-01',
      days: {
        0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true,
      },
    });
    expect(newLessons.length).to.equal(300);
  });
  it('test calculateDaysOfLessons, lastDate = 2019-03-01', () => {
    const newLessons = calculateDaysOfLessons({
      lastDate: '2019-03-01',
      firstDate: '2019-01-01',
      days: {
        0: true,
      },
    });
    expect(newLessons).to.have.members(['2019-01-06',
      '2019-01-13',
      '2019-01-20',
      '2019-01-27',
      '2019-02-03',
      '2019-02-10',
      '2019-02-17',
      '2019-02-24']);
  });
});

describe('Test compareStudentsCount', () => {
  it('test compareStudentsCount value is lower then Array', () => {
    const result = compareStudentsCount([6, 7], 5);
    expect(result).not.equal(true);
  });
  it('test compareStudentsCount value equals array', () => {
    const result = compareStudentsCount([6], 6);
    expect(result).equal(true);
  });
  it('test compareStudentsCount value noy equals array', () => {
    const result = compareStudentsCount([7], 5);
    expect(result).not.equal(true);
  });
});
