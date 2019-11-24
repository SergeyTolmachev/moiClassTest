const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.use(chaiHttp);

const { expect } = chai;

const { Lesson, LessonTeacher } = require('../src/schemas');

describe('create', async () => {
  let cleanList = [];

  after(async () => {
    server.close();
    await LessonTeacher.destroy({ where: { lesson_id: cleanList }});
    await Lesson.destroy({ where: { id: cleanList }});
  });

  it('create 9 lessons', (done) => {
    chai
      .request(server)
      .post('/lessons')
      .send({
        lessonsCount: 9,
        firstDate: '2019-01-01',
        days: [0, 1, 2],
        teacherIds: [1],
        title: 'new lessons',
      })
      .end((err, res) => {
        const { body } = res;
        cleanList = cleanList.concat(body);
        expect(res).to.have.status(200);
        expect(body.length).equal(9);
        done();
      });
  });

  it('create 300 lessons with lessons count', (done) => {
    chai
      .request(server)
      .post('/lessons')
      .send({
        lessonsCount: 365,
        firstDate: '2019-01-01',
        days: [0, 1, 2, 3, 4, 5, 6],
        teacherIds: [1, 2],
        title: 'new lessons',
      })
      .end((err, res) => {
        const { body } = res;
        cleanList = cleanList.concat(body);
        expect(res).to.have.status(200);
        expect(body.length).equal(300);
        done();
      });
  });

  it('create 300 lessons with lastDate', (done) => {
    chai
      .request(server)
      .post('/lessons')
      .send({
        firstDate: '2019-01-01',
        lastDate: '2021-01-01',
        days: [0, 1, 2, 3, 4, 5, 6],
        teacherIds: [1],
        title: 'new lessons',
      })
      .end((err, res) => {
        const { body } = res;
        cleanList = cleanList.concat(body);
        expect(res).to.have.status(200);
        expect(body.length).equal(300);
        done();
      });
  });
});
