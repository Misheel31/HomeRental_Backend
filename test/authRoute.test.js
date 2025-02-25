process.env.NODE_ENV = "test";

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const server = require("../app");
const should = chai.should();

chai.use(chaiHttp);
it("should register a new user", function (done) {
  this.timeout(5000);
  const newUser = {
    username: "testuser",
    email: "testuser2@example.com",
    password: "password123",
    confirmPassword: "password123",
    // image: "image_url",
  };

  chai
    .request(server)
    .post("/api/auth/register")
    .send(newUser)
    .end((err, res) => {
      expect(res).to.have.status(201);
      expect(res.body).to.have.property(
        "message",
        "User registered successfully"
      );
      done();
    });
});

it("should not register a user with an existing email", function (done) {
  const existingUser = {
    username: "testuser",
    email: "testuser1@example.com",
    password: "password123",
    confirmPassword: "password123",
    // image: "image_url",
  };

  chai
    .request(server)
    .post("/api/auth/register")
    .send(existingUser)
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.have.property("error", "Email is already registered");
      done();
    });
});

it("should log in a user", function (done) {
  const loginData = {
    email: "testuser1@example.com",
    password: "password123",
  };

  chai
    .request(server)
    .post("/api/auth/login")
    .send(loginData)
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("message", "Login successful");
      done();
    });
});

it("should not log in with an incorrect password", function (done) {
  const loginData = {
    email: "testuser@example.com",
    password: "wrongpassword",
  };

  chai
    .request(server)
    .post("/api/auth/login")
    .send(loginData)
    .end((err, res) => {
      expect(res).to.have.status(401);
      expect(res.body).to.have.property("error", "Invalid password");
      done();
    });
});

it("should handle forgotten passwords", function (done) {
  chai
    .request(server)
    .post("/api/auth/forgotpassword")
    .send({ email: "testuser@example.com" })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("status", "Token generated");
      done();
    });
});

it("should reset password", function (done) {
  chai
    .request(server)
    .post("/api/auth/resetpassword")
    .send({
      email: "testuser@example.com",
      newPassword: "newpassword123",
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.have.property(
        "success",
        "Password updated successfully!"
      );
      done();
    });
});
