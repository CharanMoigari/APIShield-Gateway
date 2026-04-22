const express = require("express");
const router = express.Router();
const axios = require("axios");

const BACKEND_URL = process.env.BACKEND_URL;

router.use(async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: BACKEND_URL + req.originalUrl,
      data: req.body,
      headers: {
        "Content-Type": "application/json",
        "Authorization": req.headers.authorization || ""
      }
    });

    res.status(response.status).json(response.data);

  } catch (err) {
    console.log("PROXY ERROR:", err.message);

    if (err.response) {
      console.log("STATUS:", err.response.status);
      console.log("DATA:", err.response.data);
    }

    res.status(500).json({ error: "Gateway error" });
  }
});

module.exports = router;