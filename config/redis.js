require("dotenv").config();
const { createClient } = require("redis");

const client = createClient({
  url: process.env.REDIS_URL
});

client.on("error", (err) => {
  console.log("Redis Error:", err.message);
});

(async () => {
  try {
    await client.connect();
    console.log("Redis connected");
  } catch (err) {
    console.log("Redis connection failed");
  }
})();

module.exports = client;