const request = require("supertest");
const app = require("./app");

//run tests in /dist directory using jest

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
    });
});





