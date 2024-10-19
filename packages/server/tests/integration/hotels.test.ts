import request from "supertest";
import app from "@/api/app";


describe("/hotels", async () => {
  let server = app.listen(0);

  beforeAll(async () => {

  });

  afterAll(async () => {
    server.close();
  });

  afterEach(async () => {
  });

  describe("GET /:id", () => {

    it("should return hotel if hotel is found", async () => {

    });

    it("should return 404 if hotel not found", async () => {
    });

    it("should return 400 if id is invalid", async () => {
    });
  });

});
