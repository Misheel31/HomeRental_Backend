const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const User = require("../models/userModel");
const expect = chai.expect;

chai.use(chaiHttp);

describe("User API Tests", () => {
  let userId = "67c022ace01918f5d1b003d2";
  let propertyId;
  let username = "testuser";

  it("should get all users", async () => {
    const res = await chai.request(server).get("/api/user/");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.greaterThan(0);
  });

  it("should get a user by Id", async () => {
    const res = await chai.request(server).get(`/api/user/${userId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("_id").equal(userId);
  });

  it("should update a user", async () => {
    const updatedData = { username: "hello" };
    const res = await chai
      .request(server)
      .put(`/api/user/${userId}`)
      .send(updatedData);

    console.log("Update Response:", res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("message").equal("Profile Updated");
  });

  it("should return 400 if no file uploaded", async () => {
    const res = await chai
      .request(server)
      .post("/api/user/uploadImage")
      .send({});
    expect(res).to.have.status(400);
    expect(res.body).to.equal("Please upload a file");
  });
});
