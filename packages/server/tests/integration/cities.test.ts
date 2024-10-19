import request from "supertest";
import app from "@/api/app";


describe("/cities", async () => {
  let server = app.listen(0);

  beforeAll(async () => {

  });

  afterAll(async () => {
    server.close();
  });

  afterEach(async () => {
  });

  describe("GET /:id", () => {

    it("should return city if city is found", async () => {

    });

    it("should return 404 if city not found", async () => {
    });

    it("should return 400 if id is invalid", async () => {
    });
  });

});
