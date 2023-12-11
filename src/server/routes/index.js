"use strict";

const { Router, json, urlencoded } = require("express");
const pinoHttp = require("pino-http");
const dns = require("dns");
const path = require("path");
const loggerOptions = require("../config/loggerOptions");
const collection = require("../services/collection");
const httpUrl = require("../util/httpUrl");
const router = Router({ strict: true });

router.use(json());
router.use(urlencoded({ extended: true }));
router.use(pinoHttp({ ...loggerOptions }));

router.get("/shorten", async (req, res) => res.sendFile(path.join(__dirname, "../../../", "public/")));
router.post("/shorten", async function (req, res, next) {
  const url = httpUrl(req.body.url);
  const dnsLookupCallback = async (err) => {
    try {
      if (err) throw new Error(err);
      const urlId = await collection.insertOriginalUrl(url.href);
      res.json({ original_url: url.href, url_id: urlId });
    } catch (error) {
      next(error);
    }
  };
  if (url.isValid) dns.lookup(url.host, { all: true }, dnsLookupCallback);
  else next(url.error);
});

router.get("/shorten/:urlId", async function (req, res, next) {
  try {
    const originalUrlDoc = await collection.findOriginalUrl(req.params.urlId);
    if (!originalUrlDoc) {
      return res.status(404).json({ error: "Shortened URL not found :)" });
    } else {
      return res.redirect(302, originalUrlDoc.originalUrl);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
