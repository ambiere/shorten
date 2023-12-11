const generateId = require("../util/generateId");
const mongodb = require("./mongodb");

const getUrlCollection = async () => {
  const db = await mongodb.getUrlDatabase();
  return db.collection("url");
};

async function insertOriginalUrl(url) {
  const urlId = await generateId();
  const urlCollection = await getUrlCollection();
  const { acknowledged } = await urlCollection.insertOne({ urlId, originalUrl: url });
  if (!acknowledged) {
    await mongodb.closeMongoClient();
    const error = new Error("Write result not aknowledged :)");
    throw error;
  }
  await mongodb.closeMongoClient();
  return urlId;
}

async function findOriginalUrl(urlId) {
  const urlCollection = await getUrlCollection();
  const originalUrlDoc = await urlCollection.findOne({ urlId }, { projection: { _id: 0 } });
  await mongodb.closeMongoClient();
  return originalUrlDoc;
}

module.exports = { insertOriginalUrl, findOriginalUrl };
