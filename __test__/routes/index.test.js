const t = require("tap");
const request = require("supertest");
const app = require("../../src/server/server");

t.test("Should return shortened and long url in json", async (t) => {
  t.plan(4);
  const response = await request(app)
    .post("/v0/api/shorten")
    .set("Content-Type", "application/json")
    .send({ url: "https://datestamp.fly.dev/v0/api/datestamp" });
  t.ok(response.body, "Returned a body");
  t.equal(response.statusCode, 200);
  t.match(response.body, { original_url: "https://datestamp.fly.dev/v0/api/datestamp", url_id: /\w+/ });

  t.test("Should redirect when passed :shorten url", async (t) => {
    const _response = await request(app).get(`/v0/api/shorten/${response.body.url_id}`);
    t.equal(_response.statusCode, 302);
  });
});

t.test("Error when passing invalid url", async (t) => {
  t.plan(3);
  const response = await request(app)
    .post("/v0/api/shorten")
    .set("Content-Type", "application/json")
    .send({ url: "ftp://zhid0399123.invalid" });

  t.ok(response.body, "Return error body");
  t.equal(response.statusCode, 400);
  t.match(response.body, { error: "Invalid URL", statusCode: 400 });
});
