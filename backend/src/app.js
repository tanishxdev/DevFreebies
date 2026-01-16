// app.js
// Express app configuration (middlewares, routes, errors)

import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// Load environment variables ONLY in local development
// Render already injects env vars in production
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// Import routes
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import resourceRoutes from "./routes/resources.js";
import userRoutes from "./routes/users.js";

const app = express();

// -------------------- MIDDLEWARES --------------------

// Enable CORS
// CLIENT_URL comes from environment variables
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local frontend dev
      process.env.CLIENT_URL,  // production frontend
    ],
    credentials: true,
  })
);

// Parse incoming JSON requests
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// -------------------- ROUTES --------------------

app.use("/api/auth", authRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// Health / Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to DevFreebies API",
    version: "1.0.0",
  });
});

// -------------------- ERROR HANDLERS --------------------

// 404 handler (no route matched)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.url}`,
  });
});

// Global error handler (centralized)
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",

    // Show stack trace ONLY in development
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

export default app;
