const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const Property = require("../models/propertyModel");
const fs = require("fs");
const path = require("path");

const expect = chai.expect;
chai.use(chaiHttp);

describe("Property API Tests", () => {
  let propertyId = "67b875113243ba934d08693b";

  it("should create a new property", async () => {
    const imagePath = path.join(__dirname, "../property_images/image.avif");
    if (!fs.existsSync(imagePath)) {
      console.error(`Test image not found: ${imagePath}`);
      return;
    }

    const res = await chai
      .request(server)
      .post("/api/property/properties/create")
      .attach("image", fs.readFileSync(imagePath), "image.avif")
      .field("title", "New Test Property")
      .field("location", "Cornwall")
      .field("pricePerNight", 300)
      .field("description", "A stunning house in Cornwall.")
      .field("bedCount", 2)
      .field("bedroomCount", 3)

    expect(res).to.have.status(201);
    expect(res.body).to.have.property("_id");
    propertyId = res.body._id;
  });

  it("should get all properties", async () => {
    const res = await chai.request(server).get("/api/property/properties");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.greaterThan(0);
  });

  it("should get a property by ID", async () => {
    const res = await chai.request(server).get(`/api/property/properties/${propertyId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("_id").equal(propertyId);
  });

  it("should update a property", async () => {
    const updatedData = { title: "Updated Test Property" };
    const res = await chai
      .request(server)
      .put(`/api/property/properties/${propertyId}`)
      .send(updatedData);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("title").equal("Updated Test Property");
  });

  it("should delete a property", async () => {
    
    const res = await chai
      .request(server)
      .delete(`/api/property/properties/${propertyId}`);
    expect(res).to.have.status(200);
    expect(res.body)
      .to.have.property("message")
      .equal("Property deleted successfully");
  });

  it("should search properties by query", async () => {
    const res = await chai
      .request(server)
      .get("/api/property/properties/search")
      .query({ searchTerm: "Old Town Treasures" });
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
  });

  it("should filter properties by location", async () => {
    const res = await chai
      .request(server)
      .get("/api/property/properties/location/Italy");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
  });

  it("should filter properties by price range", async () => {
    const res = await chai
      .request(server)
      .get("/api/property/properties/price-range")
      .query({ minPrice: 100, maxPrice: 400 });
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
  });
});
