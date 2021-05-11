import chai, { should } from "chai";
import chaiHttp from "chai-http";
import app from "../../../index";
chai.use(chaiHttp);
chai.use(should)

console.log = function () { };

describe('Community Search API testing', () => {

  describe("Test GET route /community/search", () => {
    it("should return all tasks", (done) => {
      chai.request(app)
        .get("/community/search")
        .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxMzcwMWMxM2JmNTQ4Yjg3NGUwZWEiLCJ1c2VybmFtZSI6InBvb25hbS55YWRhdkBnbWFpbC5jb20iLCJpYXQiOjE2MjAwODA4MjUsImV4cCI6MTYyMTA4ODgyNX0.Wy0qvEASQtwNQt74dtRplX_4MhufcdY-qN4h7HojA88" )
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property('docs');
          done();
        });
    });
  })
});

describe('/POST login correct', () => {
  it('should return correct login user response', (done) => {

    let user = {
      "user": {
        "email": "poonam.yadav@gmail.com",
        "password": "Abc@1234"
      }
    }
    chai.request(app)
      .post('/user/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
