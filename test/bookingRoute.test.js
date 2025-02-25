const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const Booking = require("../models/bookingModel");
const User = require("../models/userModel");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Booking API Tests", () => {
  let userId;
  let bookingId;

  before(async () => {
    let existingUser = await User.findOne({ email: "testuser1@example.com" });

    if (!existingUser) {
      const testUser = new User({
        username: "testuser",
        email: "testuser1@example.com",
        password: "password123",
      });
      existingUser = await testUser.save();
    }

    userId = existingUser.username;
  });

  it("should create a new booking", async () => {
    const bookingData = {
      username: userId,
      startDate: "2025-03-01",
      endDate: "2025-03-05",
      totalPrice: 500,
      propertyId: "67b30126dd1dcf9b4c14086d",
    };

    const res = await chai
      .request(server)
      .post("/api/booking/create")
      .send(bookingData);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("success").equal(true);
    expect(res.body.booking).to.have.property("username").equal(userId);
    bookingId = res.body.booking._id;
  });

  it("should get bookings by username", async () => {
    const res = await chai.request(server).get(`/api/booking/testuser`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("success").equal(true);
    expect(res.body.bookings).to.be.an("array").with.length.greaterThan(0);
  });

  it("should cancel a booking", async () => {
    if (!bookingId) {
      return;
    }
    const res = await chai
      .request(server)
      .delete(`/api/booking/cancel/${bookingId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("success").equal(true);
    expect(res.body)
      .to.have.property("message")
      .equal("Booking canceled successfully");
  });
});
