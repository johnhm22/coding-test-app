const request = require("supertest");
const app = require("./app");


describe("GET /search", () => {
    it("Gets a list of movies", async () => {
        await request(app)
        .get("/search")        
        .send({title: "Mission"})
        .expect(200)
    });
});