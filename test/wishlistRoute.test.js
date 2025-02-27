const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Wishlist API", () => {
  describe("GET /wishlist", () => {
    it("should return all wishlists", (done) => {
      chai
        .request(server)
        .get("/api/wishlist")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          done();
        });
    });
  });

  describe("GET /wishlist/:username", () => {
    it("should return a wishlist by username", (done) => {
      const username = "misheel";
      chai
        .request(server)
        .get(`/api/wishlist/${username}`)
        .end((err, res) => {
          console.log(`GET /wishlist/${username} response:`, res.body);

          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          if (res.body.length > 0) {
            expect(res.body[0]).to.have.property("username").equal(username);
          }
          done();
        });
    });
  });

  describe("POST /wishlist/create", () => {
    it("should create a new wishlist", (done) => {
      const newWishlist = {
        username: "misheel",
        title: "Old Town Treasures",
        image: "image4.avif",
        pricePerNight: "100",
        location: "Italy",
        propertyId: "67b30126dd1dcf9b4c14086d",
      };

      chai
        .request(server)
        .post("/api/wishlist/create")
        .set("Content-Type", "application/json")
        .send(newWishlist)
        .end((err, res) => {
          console.log("Response Body:", res.body);
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body)
            .to.have.property("username")
            .equal(newWishlist.username);
          done();
        });
    });
  });

  describe("DELETE /wishlist/:id", () => {
    it("should delete a wishlist by id", (done) => {
      const wishlistId = "67c020762e7f9fa404d36d89";
      chai
        .request(server)
        .delete(`/api/wishlist/${wishlistId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body)
            .to.have.property("message")
            .equal("Wishlist deleted successfully");
          done();
        });
    });
  });
});
