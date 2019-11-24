const { expect } = require('chai');
const { Op } = require('sequelize');
const { sanitazers } = require('../src/utils');


describe('Test sanitazers', () => {
  it('sanitazeDateOnly match', () => {
    const result = sanitazers.sanitazeDateOnly('2019-09-01');
    expect(result).equal('2019-09-01');
  });
  it('sanitazeDateOnly don\'t match', () => {
    const result = sanitazers.sanitazeDateOnly('2019-9-1');
    expect(result).equal(null);
  });
  it('sanitazeDays two weekdays', () => {
    const result = sanitazers.sanitazeDays([0, 1]);
    expect(result).to.eql({ 0: true, 1: true });
  });
  it('sanitazeDays match one weekday', () => {
    const result = sanitazers.sanitazeDays([3]);
    expect(result).to.eql({ 3: true });
  });
  it('sanitazeDays all weekdays', () => {
    const result = sanitazers.sanitazeDays([0, 1, 2, 3, 4, 5, 6]);
    expect(result).to.eql({
      0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true,
    });
  });
  it('sanitazeDates two dates', () => {
    const result = sanitazers.sanitazeDates('2019-09-01,2019-09-04');
    expect(result).to.eql({ [Op.between]: ['2019-09-01, 2019-09-04']});
  });
  it('sanitazeDates one date', () => {
    const result = sanitazers.sanitazeDates('2019-09-01');
    expect(result).equal('2019-09-01');
  });
  it('sanitazeDates no dates', () => {
    const result = sanitazers.sanitazeDates('2019-9-01');
    expect(result).equal(false);
  });
  it('sanitazeStudentsCount two students', () => {
    const result = sanitazers.sanitazeStudentsCount('1,4');
    expect(result).has.members(['1', '4']);
  });
  it('sanitazeStudentsCount one student', () => {
    const result = sanitazers.sanitazeStudentsCount('2');
    expect(result).has.members(['2']);
  });
  it('sanitazeTeacherIds three teachers', () => {
    const result = sanitazers.sanitazeTeacherIds(['1', '2', '3']);
    expect(result).has.members(['1', '2', '3']);
  });
  it('sanitazeTeacherIds two teachers', () => {
    const result = sanitazers.sanitazeTeacherIds('1,2');
    expect(result).has.members(['1', '2']);
  });
  it('sanitazeTeacherIds one teacher', () => {
    const result = sanitazers.sanitazeTeacherIds('2');
    expect(result).has.members(['2']);
  });
});
