import request from "supertest";
import app from "@/api/app";


describe("/countries", async () => {
  let server = app.listen(0);

  beforeAll(async () => {

  });

  afterAll(async () => {
    server.close();
  });

  afterEach(async () => {
  });

  describe("GET /:id", () => {

    it("should return hotel if country is found", async () => {

    });

    it("should return 404 if country not found", async () => {
    });

    it("should return 400 if id is invalid", async () => {
    });
  });

});
