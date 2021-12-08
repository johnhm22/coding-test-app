const request = require("supertest");
const app = require("./app");
import "@testing-library/jest-dom";

const API_KEY = process.env.API_KEY;


//run tests in /dist directory using jest

// describe("GET /home", () => {
//     it("Gets home page", async () => {
//         const res = await request(app)
//         .get("/");        
//         expect(res.statusCode).toBe(200)
//     });
// });


// describe("GET /search", () => {
//     it("Gets a list of movies", async () => {
//         const res = await request(app)
//         .get("/search")
//         .send({api_key: API_KEY})
//         .query({title: "Mission Impossible"})
//         expect(res.statusCode).toBe(200)
//         expect(typeof(res)).toBe('object')
//     });
// });


//can't get this to work

describe("GET /movie/:movieid", () => {
    it("Gets details of movie based on id ref", async () => {
        const res = await request(app)
        .get("/movie/956")
        .send({api_key: API_KEY})
        expect(res.statusCode).toBe(200);
        expect(typeof(res)).toBe('object');
    });
});


