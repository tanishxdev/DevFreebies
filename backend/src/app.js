import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

// Import routes
import authRoutes from "./routes/auth.js";
import resourceRoutes from "./routes/resources.js";
import userRoutes from "./routes/users.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://dev-freebies-alpha.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/users", userRoutes);

// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Welcome to DevFreebies API",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      resources: "/api/resources",
      users: "/api/users",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.url}`,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

export default app;
