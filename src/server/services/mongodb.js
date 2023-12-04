require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const options =
  process.env.NODE_ENV === "production"
    ? {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      }
    : {};

const client = new MongoClient(process.env.MONGO_URL, options);

async function connect() {
  await client.connect();
  const db = client.db("shorten");
  return db.collection("url");
}

async function close() {
  await client.close();
}

module.exports = { connect, close };
