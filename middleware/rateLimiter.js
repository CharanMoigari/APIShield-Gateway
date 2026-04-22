// middleware/rateLimiter.js
const { createClient } = require("redis");

const client = createClient({ url: process.env.REDIS_URL });
client.connect();

const LIMITS = {
  free: 10,
  pro: 100
};

module.exports = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const plan = req.user.plan || "free";

    const limit = LIMITS[plan];

    const key = `${userId}:${req.path}`;

    const count = await client.incr(key);

    if (count === 1) {
      await client.expire(key, 60); // 1 min window
    }

    if (count > limit) {
      return res.status(429).json({
        message: `Rate limit exceeded for ${plan} plan`
      });
    }

    next();
  } catch (err) {
    console.log("Redis Error:", err.message);
    next(); // fallback allow
  }
};