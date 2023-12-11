require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const isProduction = process.env.NODE_ENV === "production";
const serverApiOptions = {
  version: ServerApiVersion.v1,
  strict: true,
  deprecationErrors: true,
};
const mongoClientOptions = isProduction ? { serverApi: serverApiOptions } : {};
const client = new MongoClient(process.env.MONGO_URL, mongoClientOptions);

async function getUrlDatabase() {
  await client.connect();
  return client.db("shorten");
}

async function closeMongoClient() {
  await client.close();
}

module.exports = { getUrlDatabase, closeMongoClient };
