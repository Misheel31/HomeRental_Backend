process.env.NODE_ENV = "test";

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const server = require("../app");
const should = chai.should();
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

chai.use(chaiHttp);

describe("/API Tests", function () {
  it("should return a success response from the server", function (done) {
    chai
      .request(server)
      .get("/api/property/properties")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should return a 404 for a non-exisiting route", function (done) {
    chai
      .request(server)
      .get("/api/nonexistent")
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it("should add a new property with an image", function (done) {
    const newProperty = {
      title: "Test property",
      description: "Nice and beautiful place",
      location: "City",
      pricePerNight: 200,
      bedroomCount: 1,
      bedCount: 1,
      bathroomCount: 1,
      guestCount: 1,
    };

    chai
      .request(server)
      .post("/api/property/properties/create")
      .field(newProperty) 
      .attach(
        "image",
        fs.createReadStream(path.join("property_images", "images.jpg"))
      )
      .end((err, res) => {
        if (err) {
          console.error(err);
        }
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("image").that.equals("images.jpg");
        done();
      });
  });
});

