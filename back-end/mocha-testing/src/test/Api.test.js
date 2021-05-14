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
        .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxMzcwMWMxM2JmNTQ4Yjg3NGUwZWEiLCJ1c2VybmFtZSI6InBvb25hbS55YWRhdkBnbWFpbC5jb20iLCJpYXQiOjE2MjAwODA4MjUsImV4cCI6MTYyMTA4ODgyNX0.Wy0qvEASQtwNQt74dtRplX_4MhufcdY-qN4h7HojA88")
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

describe('/POST signup correct', () => {
  it('should return correct login user response', (done) => {

    let user = {
      "user": {
        "name": "Poonam",
        "email": "poonam2.yadav@gmail.com",
        "password": "Abc@1234",
        "avatar": "http://www.google.com"
      }
    }
    chai.request(app)
      .post('/user/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
});
describe('/Get get all communities created by user', () => {
  it('should return correct community response', (done) => {

    chai.request(app)
      .get('/user/getAllCommunityCreatedByUser?userId=60813701c13bf548b874e0ea')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
describe('/GET get communities detail request', () => {
  it('should return correct community details response', (done) => {

    chai.request(app)
      .get('/community/get?communityId=608906c165e3f1f87af22d53').set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxMzcwMWMxM2JmNTQ4Yjg3NGUwZWEiLCJ1c2VybmFtZSI6InBvb25hbS55YWRhdkBnbWFpbC5jb20iLCJpYXQiOjE2MjAwODA4MjUsImV4cCI6MTYyMTA4ODgyNX0.Wy0qvEASQtwNQt74dtRplX_4MhufcdY-qN4h7HojA88")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
describe('/POST upvote community correct', () => {
  it('should return correct community upvote response', (done) => {

    let user = {
      "communityId": "608906c165e3f1f87af22d53"
    }
    chai.request(app)
      .post('/community/upvote')
      .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxMzcwMWMxM2JmNTQ4Yjg3NGUwZWEiLCJ1c2VybmFtZSI6InBvb25hbS55YWRhdkBnbWFpbC5jb20iLCJpYXQiOjE2MjAwODA4MjUsImV4cCI6MTYyMTA4ODgyNX0.Wy0qvEASQtwNQt74dtRplX_4MhufcdY-qN4h7HojA88")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
 describe('/DELETE cascade delete community correct', () => {
  it('should delete the community', (done) => {

      let user = {   
        "communityId":"609d7994261e2bce57168595" 
    }

    chai.request(app)
      .post('/community/delete')
      .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxMzcwMWMxM2JmNTQ4Yjg3NGUwZWEiLCJ1c2VybmFtZSI6InBvb25hbS55YWRhdkBnbWFpbC5jb20iLCJpYXQiOjE2MjAwODA4MjUsImV4cCI6MTYyMTA4ODgyNX0.Wy0qvEASQtwNQt74dtRplX_4MhufcdY-qN4h7HojA88")
      .send(user)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
});
describe('/POST community downvote correct', () => {
  it('should return correct login user response', (done) => {

    let user = {
      "communityId": "608906c165e3f1f87af22d53"
    }
    chai.request(app)
      .post('/community/downvote')
      .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxMzcwMWMxM2JmNTQ4Yjg3NGUwZWEiLCJ1c2VybmFtZSI6InBvb25hbS55YWRhdkBnbWFpbC5jb20iLCJpYXQiOjE2MjAwODA4MjUsImV4cCI6MTYyMTA4ODgyNX0.Wy0qvEASQtwNQt74dtRplX_4MhufcdY-qN4h7HojA88")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
describe('/POST community join', () => {
  it('should return correct community join response', (done) => {

    let user = {
      "community_id":"608906c165e3f1f87af22d53"
    }
    chai.request(app)
      .post('/community/join')
      .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxMzcwMWMxM2JmNTQ4Yjg3NGUwZWEiLCJ1c2VybmFtZSI6InBvb25hbS55YWRhdkBnbWFpbC5jb20iLCJpYXQiOjE2MjAwODA4MjUsImV4cCI6MTYyMTA4ODgyNX0.Wy0qvEASQtwNQt74dtRplX_4MhufcdY-qN4h7HojA88")
      .send(user)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        done();
      });
  });
});
describe('/GET chat get request', () => {
  it('should return correct chat get response', (done) => {

    chai.request(app)
      .post('/chat/get?members=6088e740fb22fbabc712b6bf&members=608dfaab41434d46885b577e')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
});
