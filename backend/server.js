require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./db"); // If you have a MongoDB setup
const userRoutes = require("./routes/userRoutes");
const secureRoutes = require("./routes/secureRoutes");
const tripRoutes = require("./routes/tripRoutes");
const messageRoutes = require("./routes/messageRoutes"); // Add this line

const app = express();
const port = process.env.PORT || 3001;

connectDB();

// Middleware to limit repeated requests to public APIs
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(cors());
app.use(express.json()); // Ensures your server can parse JSON.
app.use(helmet()); // Secures your app by setting various HTTP headers
app.use(limiter); // Apply the rate limiting middleware to all requests

// Middleware to log each request to the console
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Setup routes
app.use("/api/users", userRoutes); // Handles routes defined in userRoutes
app.use("/api", secureRoutes); // Handles routes defined in secureRoutes
app.use("/api/trips", tripRoutes); // Handles routes defined in tripRoutes
app.use("/api", messageRoutes); // Add this line to handle message routes

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack for server-side debugging
  res.status(500).send({
    status: "error",
    message: "An unexpected error occurred!",
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
