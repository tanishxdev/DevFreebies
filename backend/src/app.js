import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// Logging in development

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// Import routes
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import resourceRoutes from "./routes/resources.js";
import userRoutes from "./routes/users.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "https://dev-freebies-alpha.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to DevFreebies API",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      resources: "/api/resources",
      users: "/api/users",
      admin: "/api/admin",
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

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

export default app;
