const index = require('../index')
const request = require('supertest')

// beforeAll(done => {
//     done()
//   })
// afterAll(done => {
//     server.close();
//     done();
// });

describe("GET /countryDataRouter", () => {
    test("It should display all the country data", async () => {
      const response = await request(index).get("/country").send({
        page : 1,
        searchString : "",
        columnName : "ID",
        order : "ASC",
        listPerPage : "5"
      });
      expect(response.body.length).toBe(5);
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("name");
      expect(response.statusCode).toBe(200);
    });
  });