"use strict";

const { Router, json } = require("express");
const pinoHttp = require("pino-http");
const path = require("path");
const loggerOptions = require("../config/loggerOptions");
const mongodb = require("../services/mongodb");
const generateId = require("../util/generateId");
const router = Router({ strict: true });

router.use(json());
router.use(pinoHttp({ ...loggerOptions }));

router.get("/shorten", async (req, res) => res.sendFile(path.join(__dirname, "../../../", "public/")));
router.post("/shorten", async function (req, res, next) {
  const url = req.body.url;
  try {
    const urlId = await generateId();
    const urlCollection = await mongodb.connect();
    const { acknowledged } = await urlCollection.insertOne({ urlId, url: url });
    if (!acknowledged) {
      const error = new Error("Write result not aknowledged :)");
      throw error;
    }
    res.json({ url, shortenUrl: `https://shorten.fly.dev/v0/api/shorten/${urlId}` });
  } catch (error) {
    next(error);
  } finally {
    mongodb.close();
  }
});

router.get("/shorten/:shortId", async function (req, res, next) {
  const shortId = req.params.shortId;
  try {
    const urlCollection = await mongodb.connect();
    const response = await urlCollection.findOne({ urlId: shortId });
    if (!response) {
      return res.status(404).json({ error: "Shortened URL not found :)" });
    }
    res.redirect(response.url);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
