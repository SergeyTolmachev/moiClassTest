const { expect } = require('chai');
const { validators } = require('../src/utils');


describe('Test validators', async () => {
  it('validateDays three weekdays', () => {
    const result = validators.validateDays([0, 2, 3]);
    expect(result).equal(true);
  });
  it('validateDays all weekdays', () => {
    const result = validators.validateDays([0, 2, 3]);
    expect(result).equal(true);
  });
  it('validateDays error in weekdays', () => {
    const result = validators.validateDays([0, 2, 3]);
    expect(result).equal(true);
  });
  it('validateStudentsCount two values', () => {
    const result = validators.validateStudentsCount('0,2');
    expect(result).equal(true);
  });
  it('validateStudentsCount one value', () => {
    const result = validators.validateStudentsCount('3');
    expect(result).equal(true);
  });
  it('validateStudentsCount error in values', () => {
    const result = validators.validateStudentsCount('3asd');
    expect(result).equal(true);
  });
  it('validateDates two dates', () => {
    const result = validators.validateDates('2019-09-01,2019-09-06');
    expect(result).equal(true);
  });
  it('validateDates one date', () => {
    const result = validators.validateDates('2019-09-01');
    expect(result).equal(true);
  });
  it('validateDates error in values', () => {
    const result = validators.validateDates('2019-9-01');
    expect(result).equal(false);
  });
  it('validateTeachersIds no teacher id DB', async () => {
    const result = await validators.validateTeacherIds('5');
    expect(result).equal(false);
  });
  it('validateTeachersIds two teachers', async () => {
    const result = await validators.validateTeacherIds('1,2');
    expect(result).equal(true);
  });
  it('validateTeachersIds one teacher', async () => {
    const result = await validators.validateTeacherIds('1');
    expect(result).equal(true);
  });
  it('validateTeachersIds error in teacherIds', async () => {
    const result = await validators.validateTeacherIds('1sdf,2');
    expect(result).equal(false);
  });
});
