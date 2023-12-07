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
  t.match(response.body, { url: /\w+/, shortenUrl: /\w+/ });

  t.test("Should redirect when passed :shorten url", async (t) => {
    const shortenUrlSegment = response.body.shortenUrl.split("/");
    const _response = await request(app).get(`v0/api/shorten/${shortenUrlSegment[shortenUrlSegment.length - 1]}`);
    t.match(_response.type, "text/html");
  });
});
