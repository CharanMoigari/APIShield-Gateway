const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/auth");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();

app.use(express.json());

// AUTH ROUTES
app.use("/auth", authRoutes);



app.get("/api/data", authMiddleware, rateLimiter, (req, res) => {
  const plan = req.user.plan;

  res.json({
    message:
      plan === "pro"
        ? "Premium Data Access"
        : "Basic Data Access (Upgrade to Pro for more features)",
    plan: plan
  });
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});