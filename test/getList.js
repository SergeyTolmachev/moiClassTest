const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.use(chaiHttp);

const { expect } = chai;

describe('getList', () => {
  after(() => {
    server.close();
  });

  it('lessons length should be 5', (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(200);
        expect(body.length).equal(5);
        done();
      });
  });

  it('page = 2, lessonsPerPage = 10 ', (done) => {
    chai
      .request(server)
      .get('/?page=2&lessonsPerPage=10')
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(200);
        expect(body.length).equal(0);
        done();
      });
  });

  it('date=2019-09-01', (done) => {
    chai
      .request(server)
      .get('/?date=2019-09-01')
      .end((err, res) => {
        const { body } = res;
        console.log(body);
        expect(res).to.have.status(200);
        expect(body.length).equal(1);
        done();
      });
  });

  it('date=2019-09-01,2019-09-04', (done) => {
    chai
      .request(server)
      .get('/?date=2019-09-01,2019-09-04')
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(200);
        expect(body.length).equal(4);
        done();
      });
  });
});
