const request = require("supertest");
const app = require("./app");


describe("GET /home", () => {
    it("Gets home page", async () => {
        const res = await request(app)
        .get("/");        
        expect(res.statusCode).toBe(200)
    });
});


describe("GET /search", () => {
    it("Gets a list of movies", async () => {
        const res = await request(app)
        .get("/search")        
        .query({title: "Mission Impossible"})
        expect(res.statusCode).toBe(200);
        expect(typeof(res)).toBe('object');
        // expect(res).toContain('Mission Impossible');
    });
});